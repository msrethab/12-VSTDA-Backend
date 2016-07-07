using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using TodoList.API.Handler;

namespace TodoList.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.EnableCors(new EnableCorsAttribute("http://localhost:8080", "*", "*"));

            // Add handler to deal with preflight requests, this is the important part
            config.MessageHandlers.Add(new PreflightRequestsHandler());

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            //Changing default Media output type from XML to json
            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);

            //Configuring json Formatter to output in CamelCase and with indented formatting
            var formatter = GlobalConfiguration.Configuration.Formatters;
            var jsonFormatters = formatter.JsonFormatter;
            var settings = jsonFormatters.SerializerSettings;
            settings.Formatting = Formatting.Indented;
            settings.ContractResolver = new CamelCasePropertyNamesContractResolver();


        }
    }
}
