$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.container.trait',
		$name:		'Children'
	}
)
(
	{
		initChildren: function()
		{console.debug('initChildren');
			var	parent			=this.getParentComponent(),
				children		=this.getConfig('children'),
				thisChildCmp	=null;
			if (!Object.isNull(children))
			{
				if (!Object.isArray(children))
				{
					children=[children];
				}
				for (var i=0,j=children.length; i<j; i++)
				{
					if (Object.isUndefined(children[i].cmp))
					{
						children[i].cmp='strappy.ccl.Container';
					}
					//Set the parent ref.
					if (this.getConfig('ref') && Object.isDefined(children[i].ref))
					{
						var parentRef='';
						if (this.getConfig('parentRef'))
						{
							parentRef=this.getConfig('parentRef')+'.';
						}
						children[i].parentRef	=parentRef+this.getConfig('ref');
						children[i].fullRef		=children[i].parentRef+'.'+children[i].ref;
					}
					//Create an instance of the child component.
					thisChildCmp=parent.newChildComponent(children[i].cmp,children[i].ref);
					
					/*
					 Bind observer for child events.
					 This will recursively redirect all child onChildReady events
					 up to the parent onChildReady observer.
					 */
					thisChildCmp.observe
					(
						'onChildReady',
						function(ref,child)
						{
							var args=$JSKK.toArray(arguments);
							args.unshift('onChildReady');
							parent.fireEvent.apply(parent,args);
						}.bind(this)
					);
					
					//Remove the reference to the component prototype.
					delete children[i].cmp;
					
					//Configure it to attach itself to THIS container.
					children[i].attachTo='#'+this.getIID();
					
					$JSKK.when
					(
						function()
						{
							return Object.isDefined(this._controllers.State);
						}.bind(thisChildCmp)
					).isTrue
					(
						function()
						{
							this._controllers.State.observeOnce
							(
								'onReadyState',
								function()
								{
									parent.fireEvent('onChildReady',this.getConfig('fullRef'),this);
								}
							);
						}.bind(thisChildCmp)
					);
					
					//Configure the component.
					thisChildCmp.configure(children[i]);
				}
			}
		}
	}
)