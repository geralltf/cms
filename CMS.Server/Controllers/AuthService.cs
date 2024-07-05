//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;
////using jwtAuth.Models;
//using CMS.Server.Model;
//using Microsoft.IdentityModel.Tokens;

////using System.IdentityModel.Tokens;
////using Microsoft.IdentityModel;

//namespace jwtAuth.Services;

//public static class Configuration
//{
//    public static string PrivateKey => "bAafd@A7d9#@F4*V!LHZs#ebKQrkE6pad2f3kj34c3dXy@";
//}

//public class AuthService
//{
//    public string Create(User user)
//    {
//        var handler = new JwtSecurityTokenHandler();

//        var privateKey = Encoding.UTF8.GetBytes(Configuration.PrivateKey);

//        var credentials = new SigningCredentials(
//            new SymmetricSecurityKey(privateKey),
//            SecurityAlgorithms.HmacSha256);

//        var tokenDescriptor = new SecurityTokenDescriptor
//        {
//            SigningCredentials = credentials,
//            Expires = DateTime.UtcNow.AddHours(1),
//            Subject = GenerateClaims(user)
//        };

//        var token = handler.CreateToken(tokenDescriptor);
//        return handler.WriteToken(token);
//    }

//    private static ClaimsIdentity GenerateClaims(User user)
//    {
//        var ci = new ClaimsIdentity();

//        ci.AddClaim(new Claim("id", user.Id.ToString()));
//        ci.AddClaim(new Claim(ClaimTypes.Name, user.Username));
//        ci.AddClaim(new Claim(ClaimTypes.GivenName, user.Name));
//        ci.AddClaim(new Claim(ClaimTypes.Email, user.Email));

//        foreach (var role in user.Roles)
//            ci.AddClaim(new Claim(ClaimTypes.Role, role));

//        return ci;
//    }
//}