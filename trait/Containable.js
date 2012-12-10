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
		}
		 */
		
		/**
		 * Iterates over the children config and inits them into
		 * this components containing div.
		 * @return {Void}
		 */
		initChildren: function()
		{
			var	parent			=this.getParentComponent(),
				children		=this.getConfig('children'),
				thisChildCmp	=null;
			
			//If HTML has been specified, ignore children.
			if (Object.isString(this.getConfig('html')))
			{
				if (!Object.isNull(this.getConfig('bodySelector')))
				{
					this.getView('Default')	.getContainer()
											.find(this.getConfig('bodySelector'))
											.append(this.getConfig('html'));
				}
				else
				{
					this.getView('Default').getContainer().append(this.getConfig('html'));
				}
				parent.fireEvent('onChildReady',this.getConfig('fullRef')+'.html',this);
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
					if (Object.isUndefined(children[i].cmp))
					{
						if (!Object.isNull(this.getConfig('defaultChildCmp')))
						{
							children[i].cmp=this.getConfig('defaultChildCmp');
						}
						else
						{
							children[i].cmp='strappy.ccl.component.Container';
						}
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
					if (!Object.isNull(this.getConfig('bodySelector')))
					{
						children[i].attachTo+=' '+this.getConfig('bodySelector');
					}
					
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
);