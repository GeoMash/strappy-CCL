$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'CardLayout',
		$extends:	'strappy.mvc.Controller'
	}
)
(
	{},
	{
		cards:{},
		onAfterCmpInit: function()
		{
			if (this.getState('layout')=='card')
			{
				//Register for card change signal.
				this.registerSignals
				(
					{
						onSwitchInstruction:
						{
							signal:	strappy.CCL.Signal.SWITCH,
							type:	strappy.CCL.Type.INSTRUCTION,
							filter:
							{
								destination:	'container',
								key:			this.getState('signalKey')
							}
						}
					}
				);
				//Show the component if autoShow is set to true.
				if (this.getState('autoShow'))
				{
					this.getView('Main').getContainer().show();
				}
				var	parent			=this.getParentComponent(),
					children		=this.getState('children'),
					activeCard		=this.getState('activeCard'),
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
							children[i].cmp='strappy.ccl.component.Container';
						}
						//Set the parent ref.
						if (this.getState('ref') && Object.isDefined(children[i].ref))
						{
							var parentRef='';
							if (this.getState('parentRef'))
							{
								parentRef=this.getState('parentRef')+'.';
							}
							children[i].parentRef	=parentRef+this.getState('ref');
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
						
						//This will handle rendering/configuring the cards.
						if (children[i].ref!=activeCard)
						{
							this.cards[children[i].ref]=children[i];
						}
						else
						{
							this.cards[children[i].ref]=true;
							
							//Configure the component.
							this.configureChild(thisChildCmp,children[i]);
						}
					}
				}
			}
		},
		configureChild: function(childCmp,config)
		{
			var	parent=this.getParentComponent();
			$JSKK.when
			(
				function()
				{
					return Object.isDefined(this._controllers.State);
				}.bind(childCmp)
			).isTrue
			(
				function()
				{
					this.observeOnce
					(
						'onReadyState',
						function()
						{
							parent.fireEvent('onChildReady',this.getState('fullRef'),this);
						}
					);
				}.bind(childCmp)
			);
			childCmp.configure(config);
		},
		onSwitchInstruction: function(signal)
		{
			this.showCard(signal.getBody().card);
		},
		hideAllChildComponents: function()
		{
			var components=this.getParentComponent().components;
			for (var ref in components)
			{
				this.hideChildComponent(ref);
			}
		},
		showCard: function(ref)
		{
			this.hideAllChildComponents();
			if (Object.isDefined(this.cards[ref]))
			{
				//Is it already configured?
				if (this.cards[ref]===true)
				{
					//Yes, so just show it.
					this.showChildComponent(ref);
				}
				//No, so lets configure it.
				else
				{
					//Configure the child component.
					this.configureChild(this.getCmp(ref),this.cards[ref]);
					//Flag it as configured.
					this.cards[ref]=true;
				}
			}
			else
			{
				throw new Error('Unable to show card. Invalid card refernece "'+ref+'".');
			}
			
			var	children	=this.getState('children'),
				components	=this.getParentComponent().components;
			for (var i=0,j=children.length; i<j; i++)
			{
				if (children[i].ref==ref)
				{
					if (Object.isDefined(components[ref]))
					{
						this.showChildComponent(ref);
					}
					else
					{
						var queue=this.newInitQueue
							(
								function()
								{
									this.showChildComponent(ref);
								}.bind(this)
							);
						if (Object.isUndefined(children[i].config))children[i].config={};
						children[i].config.attachTo=this.getView('Main').getContainerSelector();
						queue.add
						(
							children[i].ref,
							children[i].cmp,
							children[i].config
						);
						queue.execute();
					}
					this.setState('activeCard',ref);
				}
				else if (Object.isDefined(components[children[i].ref]))
				{
					this.hideChildComponent(children[i].ref);
				}
			}
		}
	}
);