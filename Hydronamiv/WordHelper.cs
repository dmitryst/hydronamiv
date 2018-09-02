using DocumentFormat.OpenXml.Packaging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Hydronamiv
{
    public static class WordHelper
    {
        public static async Task<byte[]> ReplaceInFile(string path, IReadOnlyDictionary<string, string> dictionary)
        {
            using (var ms = new MemoryStream())
            {
                using (var file = File.Open(path, FileMode.Open, FileAccess.Read, FileShare.Read))
                {
                    await file.CopyToAsync(ms);
                }

                ms.Seek(0, SeekOrigin.Begin);

                using (var document = WordprocessingDocument.Open(ms, true))
                {
                    string documentText = null;
                    using (var sr = new StreamReader(document.MainDocumentPart.GetStream()))
                    {
                        documentText = await sr.ReadToEndAsync();
                    }

                    foreach (var pair in dictionary)
                    {
                        var regexText = new Regex(pair.Key, RegexOptions.IgnoreCase);
                        documentText = regexText.Replace(documentText, pair.Value);
                    }

                    using (var sw = new StreamWriter(document.MainDocumentPart.GetStream(FileMode.Create)))
                    {
                        await sw.WriteAsync(documentText);
                    }

                    ms.Position = 0;
                }

                return ms.ToArray();
            }
        }
    }
}
