$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Movable'
	}
)
(
	{
		onMoveStart: function(event)
		{
			if (Object.isFunction(this.getView('Main').disableAnimations))
			{
				this.getView('Main').disableAnimations();
			}
			$('body').addClass('is-dragging');
			var	position		=this.getView('Main').getContainer().position();
			this.moving			=true;
			this.movingMatrix	=
			{
				x:	(event.clientX-position.left),
				y:	(event.clientY-position.top)
			};
		},
		onMoveUpdate: function(event)
		{
			if (this.moving)
			{
				var	view		=this.getView('Main'),
					container	=view.getContainer(),
					left		=event.clientX-this.movingMatrix.x,
					top			=event.clientY-this.movingMatrix.y;
				
				if (top<0)		top	=0;
				if (left<0)		left=0;
				
				if ((top+container.height())>$(view.getState('attachTo')).innerHeight())
				{
					top=$(view.getState('attachTo')).innerHeight()-container.height();
				}
				if ((left+container.width())>$(view.getState('attachTo')).innerWidth())
				{
					left=$(view.getState('attachTo')).innerWidth()-container.width();
				}
				
				container.css
				(
					{
						left:	left+'px',
						top:	top+'px'
					}
				);
			}
		},
		onMoveEnd: function()
		{
			if (this.moving)
			{
				this.moving			=false;
				this.movingMatrix	={x:0,y:0};
				if (Object.isFunction(this.getView('Main').enableAnimations))
				{
					this.getView('Main').enableAnimations();
				}
				$('body').removeClass('is-dragging');
			}
		}
	}
);