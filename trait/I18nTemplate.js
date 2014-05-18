/**
 * 
 * @class strappy.ccl.trait.Movable
 */
$JSKK.Trait.create
(
	{
		$namespace:	'strappy.ccl.trait',
		$name:		'I18nTemplate'
	}
)
(
	{
		getAndParseTemplate: function(ref)
		{
			var template=this.getTemplate(ref);
			return this.parseTemplate(template);
		},
		parseTemplate: function(template)
		{
			var	matches		=template.match(/{([^}]+)}/g),
				thisVar		=null;
			if (Object.isArray(matches))
			{
				for (var i=0,j=matches.length; i<j; i++)
				{
					thisVar=matches[i].replace(/{|}/g,'');
					template=template.replace(matches[i],i18n.t(thisVar));
				}
			}
			return template;
		}
	}
);