$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.controller',
		$name:		'Router',
		$extends:	'strappy.mvc.Controller'
	}
)
(
	{},
	{
		routes:[],
		onAfterCmpInit: function()
		{
			var view=null;
			try
			{
				view=this.getView('Main');
			}
			catch(e)
			{
				view=this.getView('Structure');
			}
			view.observe('onReady',this.onViewReady.bind(this));
		},
		onViewReady: function()
		{
			$('body').on('click','[data-strappy-route]',null,this.onClickableRoute.bind(this));
		},
		onClickableRoute: function(event)
		{
			var path=$(event.currentTarget).data('strappy-route');
			if (Object.isString(path))
			{
				this.goTo(path);
			}
		},
		isValidRoute: function(path)
		{
			//TODO: Regex.
			return this.routes.inArray(path);
		},
		
		/**
		 * Used by everything except the state controller
		 * to set the "route".
		 */
		goTo: function(path)
		{
			this.setState('p',path);
		},
		/**
		 * Used by the state controller to handle changes
		 * to the "p" state.
		 */
		routeTo: function(path)
		{
			$JSKK.when
			(
				function()
				{
					return this.cmp().isReady();
				}.bind(this)
			).isTrue
			(
				function()
				{
					var	cmp			=this.getParentComponent(),
						nodes		=path.split('/'),
						first		=null,
						remainder	=null,
						name		=null,
						controller	=cmp._controllers,
						action		=null,
						args		=[];
					
					for (var i=0,j=nodes.length; i<j; i++)
					{
						first		=nodes[i].substring(0,1),
						remainder	=nodes[i].substring(1),
						name		=first.toUpperCase()+remainder;
						
						if (Object.isDefined(controller[name]))
						{
							controller	=controller[name];
							action		=nodes[++i];
							i++;
							while (nodes[i])
							{
								args.push(nodes[i]);
								i++;
							}
							if (Object.isDefined(controller[action]))
							{
								controller[action].apply(controller,args);
							}
							break;
						}
						else if (Object.isDefined(controller[nodes[i]]))
						{
							controller=controller[nodes[i]];
							//TODO: Finish this maybe?
						}
						else
						{
							return;
						}
					}
				}.bind(this)
			);
		}
	}
);