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
					transition:				'none',
					'-o-transition':		'none',
					'-moz-transition':		'none',
					'-webkit-transition':	'none'
				}
			);
		}
	}
);