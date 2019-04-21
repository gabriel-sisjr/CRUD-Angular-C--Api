using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private List<Categoria> _categorias = new List<Categoria>()
        {
            new Categoria
            {
                Id = 1,
                Nome = "Categoria1",
                Descricao = "Descricao1"
            },
            new Categoria
            {
                Id = 2,
                Nome = "Categoria2",
                Descricao = "Descricao2"
            },
            new Categoria
            {
                Id = 3,
                Nome = "Categoria3",
                Descricao = "Descricao3"
            }
        };

        // GET: api/Categoria
        [HttpGet]
        public List<Categoria> Get() => _categorias;

        // GET: api/Categoria/5
        [HttpGet("{id}")]
        public Categoria Get(int id) => _categorias.Find(c => c.Id == id);

        // POST: api/Categoria
        [HttpPost]
        public void Post([FromBody] Categoria categoria)
        {
            _categorias.Add(categoria);
        }

        // PUT: api/Categoria/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
