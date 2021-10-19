using Accounts.Core;
using Common;
using Common.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Accounts.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserManagmentController : ControllerBase
    {
        private readonly IUserManagementService userService;

        public UserManagmentController(IUserManagementService userManagment)
        {
            this.userService = userManagment;
        }


        [EnableCors("react")]
        [HttpGet("users")]
        public Response<List<UserDTO>> GetUsers()
        {
            var result = new List<UserDTO>();
            var _users = userService.GetUsers();
            if (_users.Count != 0)
                result = _users.MapTo<UserDTO>().ToList();
            return new Response<List<UserDTO>>(result);
        }


        [EnableCors("react")]
        [HttpGet("user-by-nationalCode")]
        public Response<UserUpdateDTO> GetUserByNationalCode(string nationalCode)
        {
            if (string.IsNullOrEmpty(nationalCode))
                return new Response<UserUpdateDTO>(Messages.InvalidInfo);
            if (!ValidationHelper.IsValidNationalCode(nationalCode))
                return new Response<UserUpdateDTO>(Messages.InvalidNationalCode);
            UserUpdateDTO result = new UserUpdateDTO();
            var _user = userService.GetUser(nationalCode);
            if (_user is null)
                return new Response<UserUpdateDTO>(Messages.NotFoundInformation);
            result = _user.MapTo<UserUpdateDTO>();
            return new Response<UserUpdateDTO>(result);
        }

        [EnableCors("react")]
        [HttpGet("user-info")]
        public Response<UserUpdateDTO> GetUserById(long userId)
        {
            if (userId == default(long))
                return new Response<UserUpdateDTO>(Messages.InvalidInfo);
            UserUpdateDTO result = new UserUpdateDTO();
            var _user = userService.GetUser(userId);
            if (_user is null)
                return new Response<UserUpdateDTO>(Messages.NotFoundInformation);
            result = _user.MapTo<UserUpdateDTO>();
            return new Response<UserUpdateDTO>(result);
        }


        [EnableCors("react")]
        [HttpPost("insert-user")]
        public Response<UserInsertDTO> InsertUser([FromBody] UserInsertDTO model)
        {
            if (!ModelState.IsValid)
            {
                return new Response<UserInsertDTO>(string.Join(",", ModelState.GetModelStateErrors()));
            }
            if (!ValidationHelper.IsValidNationalCode(model.NationalCode))
            {
                return new Response<UserInsertDTO>(Messages.InvalidNationalCode);
            }
            var _user = userService.GetUser(model.NationalCode);
            if (_user is not null || userService.GetUserByUserName(model.UserName) is not null)
            {
                return new Response<UserInsertDTO>(Messages.DuplicateUser);
            }
            var t = model.WindowsAuthenticate;
            if (!model.WindowsAuthenticate && (string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(model.RepeatePassword)))
            {
                return new Response<UserInsertDTO>(Messages.PasswordIsRequired);
            }
            _user = model.MapTo<User>();
            if (!model.WindowsAuthenticate)
            {
                _user.PasswordHash = Common.Cryptography.Helper.HashPassword(model.Password);
            }
            userService.Insert(_user);
            var result = _user.MapTo<UserInsertDTO>();
            return new Response<UserInsertDTO>(result);
        }

        [EnableCors("react")]
        [HttpPut("update-user")]
        public Response<UserUpdateDTO> UpdateUser([FromBody] UserUpdateDTO model)
        {
            if (!ModelState.IsValid)
            {
                return new Response<UserUpdateDTO>(string.Join(",", ModelState.GetModelStateErrors()));
            }
            var _user = userService.GetUserByUserName(model.UserName);
            if (_user is null)
            {
                return new Response<UserUpdateDTO>(Messages.InvalidInfo);
            }
            if (!ValidationHelper.IsValidNationalCode(model.NationalCode))
            {
                return new Response<UserUpdateDTO>(Messages.InvalidNationalCode);
            }
            _user = userService.GetUser(model.NationalCode);
            if (_user is not null && _user.UserName != model.UserName)
            {
                return new Response<UserUpdateDTO>(Messages.DuplicateNationalCode);
            }
            model.MapTo(_user);
            _user.LastUpdate = DateTime.Now;
            userService.Update(_user);
            var result = userService.GetUser(model.NationalCode).MapTo<UserUpdateDTO>();
            return new Response<UserUpdateDTO>(result);

        }

        [EnableCors("react")]
        [HttpDelete("delete-user")]
        public Response Delete(long userId)
        {
            var user = userService.GetUser(userId);
            if (user is null) return new Response(Messages.InvalidInfo);

            userService.DeleteUser(userId);
            return new Response();
        }

    }
}
