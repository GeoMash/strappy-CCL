$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Scrollable'
	}
)
(
	{
		initScrollable: function(event)
		{
			$('.jspscroll').each
			(
				function(index,el)
				{
					var pane=$(el).find('.jspPane');
					if (pane.length)
					{
						if (!pane.height())
						{
							pane.height(pane.parent().height());
						}
					}
				}
			);
			$('.jspscroll').jScrollPane({horizontalDragMaxWidth: 0, verticalGutter: 3});
	
			// fix for vertical guttering which fails miserably
			var 
				fix = this.find('.jspContainer'),
				length = fix.length;
			
			for(var i = 0; i<length; i++) {
				var 
					container = $(fix[i]),
					scroll = container.find('.jspVerticalBar');
				
				if(scroll.length) {
					var 
						pane = $(container.find('.jspPane')),
						w = pane.width(),
						w2 = container.width();
					if(w==w2) {
						pane.css('width', w-9)
					}
				}
			}
			return this;
		}
	}
);
