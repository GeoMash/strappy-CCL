$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Animatable'
	}
)
(
	{
		enableAnimations: function()
		{
			this.getContainer().css
			(
				{
					transition:				'all .2s linear',
					'-o-transition':		'all .2s linear',
					'-moz-transition':		'all .2s linear',
					'-webkit-transition':	'all .2s linear'
				}
			);
		},
		disableAnimations: function()
		{
			this.getContainer().css
			(
				{
					transition:				'all 0s linear',
					'-o-transition':		'all 0s linear',
					'-moz-transition':		'all 0s linear',
					'-webkit-transition':	'all 0s linear'
				}
			);
		}
	}
);