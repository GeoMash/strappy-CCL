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
		}
	}
);
