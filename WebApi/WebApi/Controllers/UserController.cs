using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using Newtonsoft.Json;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private static List<User> itens = new List<User>()
            {
                new User
                {
                    Id = 1,
                    Nome = "Gabriel",
                    Sobrenome = "Santana"
                },
                new User
                {
                    Id = 2,
                    Nome = "Pedro",
                    Sobrenome = "Silva"
                },
                new User
                {
                    Id = 3,
                    Nome = "Italo",
                    Sobrenome = "Martins"
                },
                new User
                {
                    Id = 4,
                    Nome = "Thais",
                    Sobrenome = "Carvalho"
                },
                new User
                {
                    Id = 5,
                    Nome = "Rosivania",
                    Sobrenome = "Santana"
                }
            };

        [HttpGet]
        public List<User> Get() => itens;

        [HttpGet("{id}")]
        public User Get(int id) => itens.Find(u => u.Id == id);

        [HttpPost]
        public void Post([FromBody] User user) { itens.Add(user); }

        [HttpPut("{id}")]
        public void Put(int id, User user)
        {
            var usuario = itens.FirstOrDefault(u => u.Id == id);
            usuario.Nome = user.Nome;
            usuario.Sobrenome = user.Sobrenome;
        }

        [HttpDelete("{id}")]
        public bool Delete(int id) => itens.Remove(itens.Find(p => p.Id == id));
    }
}