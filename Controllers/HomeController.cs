using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Hubs;
using SignalR.Models;
using SignalR.Utilities;
using System.Diagnostics;

namespace SignalR.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IHubContext<DeathlyHallowHub> _hubContext;

        public HomeController(ILogger<HomeController> logger, IHubContext<DeathlyHallowHub> hubContext)
        {
            _logger = logger;
            _hubContext = hubContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public async Task<IActionResult> DeathlyHallows(string type)
        {
            if (Constant.DeathlyHallowRace.ContainsKey(type))
            {
                Constant.DeathlyHallowRace[type]++;
            }
            await _hubContext.Clients.All.SendAsync("updateDeathlyHallowCount", Constant.DeathlyHallowRace[Constant.Cloak], Constant.DeathlyHallowRace[Constant.Wand], Constant.DeathlyHallowRace[Constant.Stone]);
            return Accepted();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}