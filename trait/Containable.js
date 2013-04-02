$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Containable'
	}
)
(
	{
		/**
		 * Implement the following config options in the component
		 * using this trait.
		config:
		{
			children:			null,					//array
			html:				null,					//string
			bodySelector:		null,					//string
			defaultChildCmp:	'strappy.ccl.Container'	//string
		},
		 */
		
		/**
		 * Iterates over the children config and inits them into
		 * this components containing div.
		 * @return {Void}
		 */
		initChildren: function()
		{
			this.childInstances			=[];
			this.readyChildren			=0;
			var	parent			=this.getParentComponent(),
				children		=this.getState('children'),
				thisChildCmp	=null;
			
			//If HTML has been specified, ignore children.
			if (Object.isString(this.getState('html')))
			{
				if (!Object.isNull(this.getState('bodySelector')))
				{
					this.getView('Main')	.getContainer()
											.find(this.getState('bodySelector'))
											.append(this.getState('html'));
				}
				else
				{
					this.getView('Main').getContainer().append(this.getState('html'));
				}
				parent.fireEvent('onChildReady',this.getState('fullRef')+'.html',this);
			}
			//HTML was not specified, so handle the children if there are any.
			else if (!Object.isNull(children))
			{
				//Work with arrays. So convert if not already.
				if (!Object.isArray(children))
				{
					children=[children];
				}
				//Iterate over each child component.
				for (var i=0,j=children.length; i<j; i++)
				{
					this.addChild(children[i],i);
				}
			}
		},
		addChild: function(child,i)
		{
			var	parent			=this.getParentComponent(),
				children		=this.getState('children') || [];
			if (Object.isUndefined(child.cmp))
			{
				if (!Object.isNull(this.getState('defaultChildCmp')))
				{
					child.cmp=this.getState('defaultChildCmp');
				}
				else
				{
					child.cmp='strappy.ccl.Container';
				}
			}
			//Set the parent ref.
			if (this.getState('ref') && Object.isDefined(child.ref))
			{
				var parentRef='';
				if (this.getState('parentRef'))
				{
					parentRef=this.getState('parentRef')+'.';
				}
				else
				{
					parentRef=this.$reflect('name');
				}
				child.parentRef		=parentRef+this.getState('ref');
				child.fullRef		=child.parentRef+'.'+child.ref;
			}
			else if (Object.isDefined(child.ref))
			{
				child.parentRef		=this.$reflect('name');
				child.fullRef		=child.parentRef+'.'+child.ref;
			}
			var state=Object.clone(child);
			
			//Configure it to attach itself to THIS container.
			state.attachTo='#'+this.getIID();
			if (!Object.isNull(this.getState('bodySelector')))
			{
				state.attachTo+=' '+this.getState('bodySelector');
			}
			
			//Remove the reference to the component prototype.
			delete state.cmp;
			//Create an instance of the child component.
			this.childInstances[i]=parent.newChildComponent
			(
				child.cmp,
				child.ref,
				state
			);
			
			/*
			 Bind observer for child events.
			 This will recursively redirect all child onChildReady events
			 up to the parent onChildReady observer.
			 */
			this.childInstances[i].observe
			(
				'onChildReady',
				function(ref,child)
				{
					var args=$JSKK.toArray(arguments);
					args.unshift('onChildReady');
					parent.fireEvent.apply(parent,args);
				}.bind(this)
			);
			
			
			this.observeOnce
			(
				'onReadyState',
				function()
				{
					//Check if all children are ready.
					if (++this.readyChildren===children.length)
					{
						var el		=null,
							testEl	=null;
						//Now check if each child is in the correct order.
						for (var i=0,j=children.length; i<j; i++)
						{
							el=$('#'+this.childInstances[i].getIID());
							testEl=$(':nth-child('+(i+1)+')',children[i].attachTo);
							//The elements must match otherwise they're in the wrong order.
							if (el[0]!=testEl[0])
							{
								//Wrong order - so now we must reorder the elements.
								var parentEl=$(children[0].appendTo);
								parentEl.children().remove();
								for (var k=0,l=children.length; k<l; k++)
								{
									parentEl.append(children[i]);
								}
								break;
							}
						}
					}
					parent.fireEvent('onChildReady',this.getState('fullRef'),this);
				}.bind(this)
			);
					
			//Configure the component.
			// this.childInstances[i].configure(child);
		}
	}
);