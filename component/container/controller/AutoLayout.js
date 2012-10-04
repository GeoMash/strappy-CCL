$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container.controller',
		$name:		'AutoLayout',
		$extends:	strappy.mvc.Controller
	}
)
(
	{},
	{
		init: function()
		{
			this.init.$parent();
			this.getController('State')	.observe('onReadyState',this.onReadyState.bind(this));
		},
		onReadyState: function()
		{
			if (this.getConfig('layout')=='auto')
			{
				if (this.getConfig('autoShow'))
				{
					this.getView('Default').getContainer().show();
				}
				this.initChildren();
			}
		},
		initChildren: function()
		{
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
		},
		onSignalShow: function()
		{
			this.getView('Default').getContainer().show();
		},
		onSignalHide: function()
		{
			this.getView('Default').getContainer().hide();
		}
		// onSignalShow: function()
		// {
		// 	var view=this.getView('Default');
		// 	if (this.getConfig('relativeWrapper'))
		// 	{
		// 		view.getContainer().parent().show();
		// 	}
		// 	view.getContainer().show();
		// },
		// onSignalHide: function()
		// {
		// 	var view=this.getView('Default');
		// 	if (this.getConfig('relativeWrapper'))
		// 	{
		// 		view.getContainer().parent().hide();
		// 	}
		// 	view.getContainer().hide();
		// }
	}
);