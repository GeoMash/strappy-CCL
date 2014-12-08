/**
 * 
 * @class strappy.ccl.trait.Scrollable
 */
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
			$('.jspscroll').jScrollPane({horizontalDragMaxWidth: 0, verticalDragMinHeight:30, verticalGutter: 3});
			(function()
			{
				$('.jspscroll').each
				(
					function(index,el)
					{
						var pane=$(el).find('.jspPane');
						if (pane.length)
						{
//							console.debug('HEIGHT:',pane.height());
							if (!pane.height())
							{
								var parentHeight		=pane.parent().height(),
									totalChildrenHeight	=0,
									children			=$(pane).children();
								
								for (var i=0,j=children.length; i<j; i++)
								{
									totalChildrenHeight+=parseInt($(children[i]).height());
								}
								if(Object.isDefined(this.getState('scrollPadding')))
								{
									parentHeight+=this.getState('scrollPadding');
									totalChildrenHeight+=this.getState('scrollPadding');
								}
//								console.debug(parentHeight,totalChildrenHeight);
								if (parentHeight>totalChildrenHeight)
								{
									pane.height(parentHeight);
								}
								else
								{
									pane.height(totalChildrenHeight);
								}
								$('.jspscroll').jScrollPane({horizontalDragMaxWidth: 0, verticalGutter: 3});
							}
						}
					}.bind(this)
				);
			}).defer(200, this);
	
//			// fix for vertical guttering which fails miserably
//			var 
//				fix = this.find('.jspContainer'),
//				length = fix.length;
//			
//			for(var i = 0; i<length; i++) {
//				var 
//					container = $(fix[i]),
//					scroll = container.find('.jspVerticalBar');
//				
//				if(scroll.length) {
//					var 
//						pane = $(container.find('.jspPane')),
//						w = pane.width(),
//						w2 = container.width();
//					if(w==w2) {
//						pane.css('width', w-9)
//					}
//				}
//			}
			return this;
		}
	}
);
