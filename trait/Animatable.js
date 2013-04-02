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
					transition:				'all .25s linear',
					'-o-transition':		'all .25s linear',
					'-moz-transition':		'all .25s linear',
					'-webkit-transition':	'all .25s linear'
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