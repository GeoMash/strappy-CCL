/**
 * 
 * @class strappy.ccl.component.Spinner
 * @extends strappy.Component
 */
$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component',
		$name:		'Spinner',
		$extends:	'strappy.Component'
	}
)
(
	{},
	{
		/**
		 * 
		 * @property {Object} [state]
		 * @property {Object} [state.private]
		 * @property {Number} [state.private.defaultValue]	
		 * @property {Number} [state.private.Value]					To display on load
		 * @property {Number} [state.private.defaultPadding]		How many digits to display e.g. if set to 2 1 will display as 01
		 * @property {Number} [state.private.minValue]				Minumum value for the spinner, null for none
		 * @property {Number} [state.private.maxValue]				Maximum value for the spinner, null for none
		 * @property {Number} [state.private.precision]				Number of decimal places to display and increment and decrement
		 * @property {Boolean} [state.private.loop]					Whether to loop the spinner when it reaches the minumum or maxumum values.
		 * Must have a minValue and maxValue values set for looping to work.
		 * //TODO: implement for useNumeric == false
		 * 
		 * @property {Boolean} [state.private.useNumeric]			Whether to use straight up numbers (subject to precision config) e.g. -1, 0, 1, 2. If false the altValues config array should be set
		 * @property {String} [state.private.altValues]				If useNumeric config is set to false this array must (well not must but nothing good will happen) be populated with the alternate values needed, e.g. 'AM', 'PM'
		 * @property {Boolean} [state.private.doContinuous]			Whether to continuously change the value if the mouse is held down
		 * @property {Number} [state.private.incrementTimeout]		When holding the mouse down the deleay between each value change
		 * @property {Boolean} [state.private.doAccelerate]			Whether to accelerate thevalue changes if the mouse is held down
		 * @property {Function} [state.private.accelerationRatio]	Simple ratio to control the acceleration, used if acceleration function not defined
		 * @property {Number} [state.private.minimumTimeout]		Floor for the time out when using the accelerationRatio, ignored when using accelerationFunction
		 * @property {Function} [state.private.acceleration]		Callback function, from parent component (or external library) to determine how fast the value changes accelerate
		 */
		state:
		{
			'private':
			{
				attachTo: null,
				name: '',
				cls: 'spinner-container',
				defaultValue: 0,
				defaultPadding: 2,
				minValue: null,
				maxValue: null,
				precision: 0,
				loop: false,
				useNumeric: true,
				altValues: [],
				doContinuous: true,
				incrementTimeout: 500,
				doAccelerate: true,
				accelerationRatio: 0.9,
				minimumRatioTimeout: 100,
				accelerationFunction: $JSKK.emptyFunction,
				signalKey: null,
				signalSendDestination: null,
				signalReceiveDestination: null
			}
		},
		components:
		{
			
		},
		stores:
		[
			
		],
		views:
		[
			'Default'
		],
		controllers:
		[
			'Default'
		]
	}
);