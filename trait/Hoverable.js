$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Hoverable'
	}
)
(
	{
		hoverSetUp: function(el, settings)
		{
			$(el).hoverIntent
			(
				$.extend({}, this.hoverSettings(), settings)
			);
		},
		hoverSettings: function()
		{
			// Defaults
			return {
				interval: 200,
				sensitivity: 4,
				timeout: 200,
				over: this.addHoverMenu,
				out: this.removeHoverMenu
			};
		},
		addHoverMenu: function(e)
		{
			var 
				parentContainer 	= $(e.currentTarget || e),
				menu 				= parentContainer.find('.'+parentContainer.data('hover'));  

			if (parentContainer)
			{
				parentContainer.addClass('is-active');
				parentContainer.find('.jspscroll_delayed').jScrollPane({horizontalDragMaxWidth: 0, verticalGutter: 3});
				if(menu) {
					menu.animate({opacity:1},250);
				} 
			} 
			else 
			{
				console.log('the parentContainer does not exist');
			}
		},
		removeHoverMenu: function()
		{
			var 
				parentContainer 	= $(this),
				menu 				= parentContainer.find('.'+parentContainer.data('hover'));  

			if (parentContainer)
			{
				menu.animate
				(
					{opacity:0},
					250,
					function()
					{
						parentContainer.removeClass('is-active');
					}
				);
			}
			else 
			{
				console.log('the parentContainer does not exist');
			}
		},
		getHoverMenu: function(el)
		{
			return (el.find('.'+el.data('hover')));  
		}
	}
);