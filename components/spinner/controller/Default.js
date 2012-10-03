$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.spinner.controller',
		$name:		'Default',
		$extends:	strappy.mvc.Controller
	}
)
(
	{},
	{
		mouseDown:				false,
		controlFocus:			false,
		timingOut:				false,
		timer:					null,
		currentTimeoutLength:	500,
		
		init: function()
		{
			
			this.init.$parent();
			this.getView('Default')	.observe('onTemplatesLoaded',	this.onTemplatesLoaded.bind(this));
			this.getController('State')	.observe('onReadyState',		this.onReadyState.bind(this));
			
			// receiving initialisation and values from the parent component
			this.registerSignals
			(
				{
					onValueChange:
					{
						signal:	strappy.CCL.Signal.SPINNER_CHANGE,
						type:	strappy.CCL.Type.CHANGE,
						filter:
						{
							key:					LeadGen2Reporting.component.Application.Key.CALENDAR_TIME,
							destination:			this.getConfig('signalReceiveDestination')
						}
					}
				}
			);
			
		},
		onTemplatesLoaded: function(view)
		{
			
			view.renderTemplate();
			
		},
		onReadyState: function()
		{
			
			this.getController('State').initialiseValue();
			
			this.sendValue();
			
		},
		onValueChange: function(signal)
		{
			var signalBody = signal.getBody();
			
			// check if the signal was for this spinner
			if (signalBody.source == this.getConfig('name')) {
				this.getStore('State').setCurrentValue (signalBody.value);
			}
			
		},
		onControlMousedown: function(ev)
		{
			
			this.mouseDown = true;
            var target = $(ev.target); //Bug fix: was $(ev.currentTarget) which returns the parent element
			// if we wish to allow for continuous value cahnge , make sure we run through the method that sets up the timeout
			if (this.getConfig('doContinuous')) {
				
				if (this.controlFocus) {
					if (this.timingOut) {
						clearTimeout(this.timer);
						this.timingOut = false;
						this.resetTimeout();
					}
					return this.rotateSpinner(target);

				}
			}
			
			// otherwise just run a rotation
			return this.rotate(target);
			
		},
        onControlClick:function(ev)
        {
			
            this.mouseDown = false;
            var target = $(ev.target);
            return this.rotate(target);
			
        },
		onControlMouseup: function()
		{
			
			this.mouseDown = false;
			
		},
		onControlMouseover: function()
		{
			
			this.controlFocus = true;
			
		},
		onControlMouseout: function()
		{
			
			this.controlFocus = false;
			
		},
		rotateSpinner: function(target)
		{
			
			var direction = target.attr('class');
			
			// set a timeout and rotate if the mouse is down, otherwise clear the time out
			this.timer = setTimeout(function() 
			{
				if (this.mouseDown) {
					this.rotate(direction);
					
					this.currentTimeoutLength = this.getTimeout();
					target.mousedown();
				} else {
					clearTimeout(this.timer);
					this.timingOut = false;
					this.resetTimeout();
				}
			}.bind(this), this.currentTimeoutLength);
			
		},
		rotate: function(direction)
		{
			
			// check if we already have teh direction or if we need to get it again
			// @todo store the direction in a calss property to avoid doing this jiggery pokery and allowing mixed variable type
			if (direction.jquery) {
				direction = direction.attr('class');
			}
			// letthe state controller know that we need to do an increment
			switch (direction)
			{
				case 'up':
					this.getController('State').increase();
					break
				case 'down':
					this.getController('State').decrease();
					break
				default:
					break
			}
			
			this.sendValue();
			
		},	
		getTimeout: function()
		{
			
			if (this.getConfig('doAccelerate')) {
				// if accelerating and using a function
				if (this.getConfig('accelerationFunction')) {
					// @todo pass paramters time (duration of the change), initial time, final time.
					var time = 3000;
					return this.getConfig('accelerationFunction')(time, this.getConfig('minimumRatioTimeout'), this.getConfig('incrementTimeout'));
				}
				// if accelerating and using a simple ratio
				if (this.currentTimeoutLength > this.getConfig('minimumRatioTimeout')) {
					return this.currentTimeoutLength * this.getConfig('accelerationRatio');
				}
			}
			
			// otherwise just a constant rate of change
			return this.currentTimeoutLength;
			
		},
		resetTimeout: function()
		{
			
			this.currentTimeoutLength = this.getConfig('incrementTimeout');
			
		},
		sendValue: function()
		{

			// sending valule to the parent component
			var currentValue = this.getStore('State').get('currentValue');
			this.sendSignal
			(
				LeadGen2Reporting.component.Application.Signal.SPIN_CHANGE,
				LeadGen2Reporting.component.Application.Type.CLICK,
				{
					key:			this.getConfig('signalKey'),
					destination:	this.getConfig('signalSendDestination')
				},
				{
					value:currentValue,
					source: this.getConfig('name')
				}
			);
				
		},
		onSignalShow: function()
		{
			
			this.getView('Default').show();
			
		},
		onSignalHide: function()
		{
			
			this.getView('Default').hide();
			
		}
	}
);