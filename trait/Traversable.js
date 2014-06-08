/**
 * This trait allows you to easily fetch any nested child component
 * simply by giving it a dot notated string of component references.
 * 
 * This trait works particularly well with the containable trait.
 * 
 * @class strappy.ccl.trait.Traversable
 */
$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'Traversable'
	}
)
(
	{
		getChildCmp: function(selector)
		{
			var parts	=String(selector).split('.'),
				cmp		=this;
			for (var i=0,j=parts.length; i<j; i++)
			{
				cmp=cmp.getCmp(parts[i]);
				if (Object.isUndefined(cmp))
				{
					return null;
				}
			}
			return cmp;
		}
	}
);