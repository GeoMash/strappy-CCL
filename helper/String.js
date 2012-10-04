$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.helper',
		$name:		'String'
	}
)
(
	{
		leftStrPad:  function(i,l,s) 
		{
			
			var prefix = '';
			if (i < 0) {
				prefix = '-';
				i = i * -1;
			}
			var o = i.toString();
			if (!s) {
				s = '0';
			}
			while (o.length < l) {
				o = s + o;
			}
			return prefix + o;
		},
	},
	{}
);
//Singleton
strappy.helper.String=new strappy.helper.String();