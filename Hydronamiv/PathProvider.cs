using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Hydronamiv
{
    public interface IPathProvider
    {
        string MapPath(string path);
    }

    public class PathProvider: IPathProvider
    {
        private readonly IHostingEnvironment _hostingEnvironment;

        public PathProvider(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public string MapPath(string path)
        {
            var filePath = Path.Combine(_hostingEnvironment.ContentRootPath, path);
            return filePath;
        }
    }
}
