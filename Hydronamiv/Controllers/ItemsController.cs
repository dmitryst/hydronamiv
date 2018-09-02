using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hydronamiv.Services;
using Microsoft.AspNetCore.Mvc;

namespace Hydronamiv.Controllers
{
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private readonly IPrintDocumentService _printDocumentService;

        public ItemsController(IPrintDocumentService printDocumentService)
        {
            _printDocumentService = printDocumentService;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> PrintWordDoc(string data)
        {
            try
            {
                var dictionary = new Dictionary<string, string>();
                foreach (var s in data.Split(","))
                    dictionary[s.Split(":")[0]] = s.Split(":")[1];

                var doc = await _printDocumentService.GetWordDocument(dictionary);
                return File(doc, "application/octet-stream", "Основные расчетные показатели.docx");

                // можно указать и такой contentType
                //return File(doc, "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                //    "Основные расчетные показатели.docx");
            }
            catch (Exception ex)
            {
                return Json("Ошибка печати документа: " + ex.Message);
            }
           
        }
    }
}