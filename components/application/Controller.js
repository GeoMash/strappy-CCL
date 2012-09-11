$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.application',
		$name:		'Controller',
		$extends:	strappy.mvc.Controller,
		$abstract:	true
	}
)
(
	{},
	{
		events:
		{
			onStateReady:		true,
			onAPIReady:			true,
			onSharedMgrReady:	true,
			onReady:			true
		},
		_selfReady:		false,
		_stateReady:	false,
		_APIReady:		false,
		_sharedMgrReady:false,
		_rootNS:		null,
		
		BTL:			false,
		API:			null,
		sharedMgr:		null,
		
		onReady:		$JSKK.Class.ABSTRACT_METHOD,
		
		init: function()
		{
			this._rootNS=$JSKK.namespace(this.$reflect('namespace').split('.').first());
			
			this.init.$parent();
			this.getController('State')	.observe('onReadyState',this.onReadyState.bind(this));
			
			if (Object.isString(this.BTL))
			{
				this.observeOnce
				(
					'onAPIReady',
					function()
					{
						this.initSharedMgr();
					}
				);
				this.initAPI();
			}
			else
			{
				this.initSharedMgr();
			}
			
			$JSKK.when
			(
				function()
				{
					return (this._stateReady && this._APIReady && this._sharedMgrReady);
				}.bind(this)
			).isTrue
			(
				function()
				{
					this._selfReady=true;
					this.fireEvent('onReady',this);
					this.onReady();
				}.bind(this)
			);
		},
		onReadyState: function()
		{
			this._stateReady=true;
		},
		initAPI: function()
		{
			this.API=new strappy.data.BTL({url:this.BTL});
			this.API.onReady
			(
				function()
				{
					this._rootNS.BTL	=this.API;
					this._rootNS.API	=this.API.API;
					this._APIReady		=true;
					this.fireEvent('onAPIReady',this,this.API);
				}.bind(this)
			);
		},
		initSharedMgr: function()
		{
			this.sharedMgr=new strappy.ShareMgr(this,this._rootNS);
			this._sharedMgrReady=true;
			this.fireEvent('onSharedMgrReady',this,this.sharedMgr);
			return this;
		}
	}
);