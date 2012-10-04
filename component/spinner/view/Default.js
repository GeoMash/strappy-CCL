$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.spinner.view',
		$name:		'Default',
		$extends:	strappy.mvc.View
	}
)
(
	{},
	{
		input:				null,
		
		templates:
		{
			'Spinner':		'spinner.html'
		},
		onReady: function()
		{
			this.bindDOMEvents();
		},
		bindDOMEvents: function()
		{
			
			this.bindDOMEvent
			(
				'mousedown.spinner',
				[this.getContainer(), '.controller'],
				'controller:Default',
				'onControlMousedown'
			);
			this.bindDOMEvent
				(
					'click.spinner',
					[this.getContainer(), '.controller'],
					'controller:Default',
					'onControlClick'
				);
			// don't need these event if we aren't going to continuously change the value on mousedown
			if (this.getConfig('doContinuous')) {
				this.bindDOMEvent
				(
					'mouseup.spinner',
					[this.getContainer(), '.controller span'],
					'controller:Default',
					'onControlMouseup'
				);
				this.bindDOMEvent
				(
					'mouseover.spinner',
					[this.getContainer(), '.controller span'],
					'controller:Default',
					'onControlMouseover'
				);
				this.bindDOMEvent
				(
					'mouseout.spinner',
					[this.getContainer(), '.controller span'],
					'controller:Default',
					'onControlMouseout'
				);
			}
				
		},
		syncView: function()
		{
			
		},
		renderTemplate: function()
		{
			this.getContainer().addClass(this.getConfig('spinnerClass'));
			this.setExtraClasses(this.getConfig('spinnerExtraClasses'), this.getContainer());
			this.getContainer().append(this.getTemplate('Spinner'));
			this.find('input').attr('name',this.getConfig('name'));
		},
		getInput: function()
		{
			if (this.input === null) {
				this.input = $('input', this.getContainer());
			}
			return this.input;
		},
		getInputValue: function()
		{
			if (this.getConfig('useNumeric')) {
				return this.getInput().val() * 1;
			}
			return this.getInput().val();
			
		},
		setInputValue: function(value)
		{
			return this.getInput().val(value);
		},
		setExtraClasses: function(classes, element)
		{
			if (classes.length != 0 && element instanceof jQuery) {
				$.each(classes, function(index, className) {
					element.addClass(className);
				});
			}
		}
	}
);