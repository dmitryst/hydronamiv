using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Hydronamiv.Services
{
    public interface IPrintDocumentService
    {
        Task<byte[]> GetWordDocument(Dictionary<string, string> data);
    }

    public class PrintDocumentService : IPrintDocumentService
    {
        private readonly IPathProvider _pathProvider;
        private const string wordTemplatePath = @"Templates\Основные расчетные показатели.docx";

        public PrintDocumentService(IPathProvider pathProvider)
        {
            _pathProvider = pathProvider;
        }

        public async Task<byte[]> GetWordDocument(Dictionary<string, string> data)
        {
            var path = Path.Combine(_pathProvider.MapPath(wordTemplatePath));
            return await WordHelper.ReplaceInFile(path, data);
        }
    }
}
