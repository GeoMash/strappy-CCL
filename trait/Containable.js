/**
 * 
 * Implement the following config options in the component
 * using this trait.
	children:			null,					//array
	html:				null,					//string
	bodySelector:		null,					//string
	defaultChildCmp:	'strappy.ccl.Container'	//string
 
 * @class strappy.ccl.trait.Containable
 * @requires strappy.ccl.component.container.Container
 */
$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Containable',
		$requires:
		[
			'strappy.ccl.component.container.Container'
		]
	}
)
(
	{
		/**
		 * Iterates over the children config and inits them into
		 * this components containing div.
		 * @return {void}
		 */
		initChildren: function()
		{
			this.childInstances			=[];
			this.readyChildren			=0;
			var	parent			=this.getParentComponent(),
				children		=this.getState('children');
			
			//If HTML has been specified, ignore children.
			if (!Object.isNull(this.getState('html')))
			{
				this.renderHTML(this.getState('html'));
				parent.fireEvent('onChildReady',this.getState('fullRef')+'.html',this);
				this.cmp().observe('onStateChange',this.onHTMLStateChange.bind(this));
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
			var	parent			=this.cmp(),
				children		=this.getState('children') || [],
				onReadyState	=function(thisChildCmp)
				{
					//Check if all children are ready.
					if (++this.readyChildren===children.length)
					{
						var el		=null,
							testEl	=null;
						/*
						 * Now check if each child is in the correct order.
						 * This depends on what layout is being used.
						 * 
						 * Currently the reordering supports the following layouts:
						 * * Auto
						 * * Border
						 * * Column
						 * * Card
						 */
						switch (this.getState('layout'))
						{
							case 'border':
							{
								var	usedRegions	=[],
									parentEl	=$(this.childInstances[0].getState('attachTo')),
									order		=[];
								
								for (var i=0,j=this.childInstances.length; i<j; i++)
								{
									if (Object.isDefined(this.childInstances[i].getState('region')))
									{
										if (!usedRegions.inArray(this.childInstances[i].getState('region')))
										{
											usedRegions.push(this.childInstances[i].getState('region'));
											el=$('#'+this.childInstances[i].getIID());
											switch (this.childInstances[i].getState('region'))
											{
												case 'north':	order[0]=el;	break;
												case 'east':
												{
													order[1]=el;
													el.css('width',this.childInstances[i].getState('width') || '20%');
													el.css('height',this.childInstances[i].getState('height') || '100%');
													break;
												}
												case 'west':
												{
													order[2]=el;
													el.css('width',this.childInstances[i].getState('width') || '20%');
													el.css('height',this.childInstances[i].getState('height') || '100%');
													break;
												}
												case 'center':	order[3]=el;	break;
												case 'south':	order[4]=el;	break;
												default:
												{
													console.trace();
													throw new Error('Invalid region "'+this.childInstances[i].getState('region')+'".');
												}
											}
											el.addClass('layout-border');
											el.addClass(this.childInstances[i].getState('region'));
										}
										else
										{
											console.trace();
											throw new Error('Region was already used by another child component.');
										}
									}
									else
									{
										console.trace();
										throw new Error('Region was not defined on child component.');
									}
								}
								console.debug(order);
								parentEl.children().detach();
								parentEl.append(order);
								break;
							}
							case 'column':
							{
								var order		=[],
									parentEl	=$(this.childInstances[0].getState('attachTo')),
									width		=null;
								for (var i=0,j=this.childInstances.length; i<j; i++)
								{
									el		=$('#'+this.childInstances[i].getIID());
									width	=this.childInstances[i].getState('colWidth');
									order.push(el);
									if (String(width).indexOf('.')!==0)
									{
										el.css('width',(width*100)+'%');
									}
									else
									{
										el.css('width',width);
									}
									el.css('height',this.childInstances[i].getState('height') || '100%');
									el.addClass('layout-column');
								}
								parentEl.children().detach();
								parentEl.append(order);
								break;
							}
							case 'card':
							{
								for (var i=0,j=this.childInstances.length; i<j; i++)
								{
									if (this.childInstances[i].getState('active'))
									{
										this.showCard(this.childInstances[i].getState('ref'));
									}
									else
									{
										this.hideCard(this.childInstances[i].getState('ref'));
									}
									this.childInstances[i].observe('onStateChange',this.onCardStateChange.bind(this));
								}
								break;
							}
							case 'auto':
							default:
							{
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
						}
						
						this.fireEvent('onAllChildrenReady');
					}
					parent.fireEvent('onChildReady',child.fullRef,thisChildCmp);
				}.bind(this),
				onChildReady=function(ref,child)
				{
					var args=$JSKK.toArray(arguments);
					args.unshift('onChildReady');
					parent.fireEvent.apply(parent,args);
				}.bind(this);
			
			//Handle case for when some components like to pass in models as the children.
			if (Object.isFunction(child.$reflect)
			&& Object.isDefined(child.store)
			&& Object.isDefined(child.record))
			{
				child=child.record;
			}
			if (Object.isUndefined(child.cmp) || Object.isNull(child.cmp))
			{
				if (!Object.isNull(this.getState('defaultChildCmp')))
				{
					child.cmp=this.getState('defaultChildCmp');
				}
				else
				{
					child.cmp='strappy.ccl.component.container.Container';
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
					parentRef=this.$reflect('name')+'.';
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
			
			if (Object.isDefined(child.events))
			{
				if (Object.isFunction(child.events.onReadyState))
				{
					child.events.onReadyState=child.events.onReadyState.join(onReadyState);
				}
				if (Object.isFunction(child.events.onChildReady))
				{
					child.events.onChildReady=child.events.onChildReady.join(onChildReady);
				}
			}
			else
			{
				child.events=
				{
					onReadyState:	onReadyState,
					onChildReady:	onChildReady
				}
			}
			//Create an instance of the child component.
			this.childInstances[i]=parent.newChildComponent
			(
				child.cmp,
				child.ref,
				state,
				child.events
			);
		},
		showCard: function(ref)
		{
			var cmp=this.getCmp(ref);
			for (view in cmp._views)
			{
				cmp._views[view].show();
			}
			return this;
		},
		hideCard: function(ref)
		{
			var cmp=this.getCmp(ref);
			for (view in cmp._views)
			{
				cmp._views[view].hide();
			}
			return this;
		},
		hideAllCards: function()
		{
			for (var i=0,j=this.childInstances.length; i<j; i++)
			{
				this.hideCard(this.childInstances[i].getState('ref'));
			}
			return this;
		},
		renderHTML: function(html)
		{
			if (Object.isString(html))
			{
				html='<div>'+html+'</div>';
			}
			else if (!Object.isElement(html) && Object.isUndefined(html.jquery))
			{
				html=String(html);
			}
			if (!Object.isNull(this.getState('bodySelector')))
			{
				this.getView('Main')	.getContainer()
										.find(this.getState('bodySelector'))
										.html(html);
			}
			else
			{
				this.getView('Main').getContainer().html(html);
			}
			if (this.getState('scrollable'))
			{
				this.getView('Main').initScrollable();
			}
		},
		onCardStateChange: function(cmp,state,value)
		{
			if (state=='active')
			{
				if (value)
				{
					this.showCard(cmp.getState('ref'));
				}
				else
				{
					this.hideCard(cmp.getState('ref'));
				}
			}
		},
		onHTMLStateChange: function(cmp,state,value)
		{
			if (state=='html')
			{
				this.renderHTML(value);
			}
		}
	}
);