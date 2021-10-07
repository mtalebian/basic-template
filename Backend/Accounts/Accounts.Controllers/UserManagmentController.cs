using Accounts.Core;
using Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Accounts.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class UserManagmentController : ControllerBase
    {
        private readonly IUserManagementService userManagment;

        public UserManagmentController(IUserManagementService userManagment)
        {
            this.userManagment = userManagment;
        }


        [HttpGet("UserInfo")]
        public Response<UserUpdateDTO> GetUserByNationalCode(string nationalCode)
        {
            UserUpdateDTO result = new UserUpdateDTO();
            var _user = userManagment.GetUser(nationalCode);
            if (_user is not null) result = _user.MapTo<UserUpdateDTO>();
            return new Response<UserUpdateDTO>(result);
        }

        [EnableCors("react")]
        [HttpPost("insert-user")]
        public Response<UserInsertDTO> InsertUser([FromBody] UserInsertDTO model)
        {
            if (!Common.Validation.ValidationHelper.IsValidNationalCode(model.NationalCode))
            {
                return new Response<UserInsertDTO>(Messages.InvalidNationalCode);
            }
            var _user = userManagment.GetUser(model.NationalCode);
            if (_user is not null || userManagment.GetUserByUserName(model.UserName) is not null)
            {
                return new Response<UserInsertDTO>(Messages.DuplicateUser);
            }
            _user = model.MapTo<User>();
            if (!model.WindowsAuthenticate)
            {
                _user.PasswordHash = Common.Cryptography.Helper.HashPassword(model.Password);
            }
            userManagment.Insert(_user);
            var result = _user.MapTo<UserInsertDTO>();
            return new Response<UserInsertDTO>(result);
        }

        [EnableCors("react")]
        [HttpPut("update-user")]
        public Response<UserUpdateDTO> UpdateUser([FromBody] UserUpdateDTO model)
        {
            var _user = userManagment.GetUserByUserName(model.UserName);
            if (_user is null)
            {
                return new Response<UserUpdateDTO>(Messages.InvalidInfo);
            }
            if (!Common.Validation.ValidationHelper.IsValidNationalCode(model.NationalCode))
            {
                return new Response<UserUpdateDTO>(Messages.InvalidNationalCode);
            }
            _user = userManagment.GetUser(model.NationalCode);
            if (_user is not null && _user.UserName != model.UserName)
            {
                return new Response<UserUpdateDTO>(Messages.DuplicateNationalCode);
            }
            model.MapTo(_user);
            _user.LastUpdate = DateTime.Now;
            userManagment.Update(_user);
            var result = userManagment.GetUser(model.NationalCode).MapTo<UserUpdateDTO>();
            return new Response<UserUpdateDTO>(result);

        }

        [EnableCors("react")]
        [HttpDelete("delete-user")]
        public Response Delete(string nationalCode)
        {
            if (string.IsNullOrEmpty(nationalCode) || !Common.Validation.ValidationHelper.IsValidNationalCode(nationalCode))
            {
                return new Response(Messages.InvalidInfo);
            }
            var user = userManagment.GetUser(nationalCode);
            if (user is null) return new Response(Messages.InvalidInfo);

            userManagment.DeleteUser(nationalCode);
            return new Response();
        }

    }
}
