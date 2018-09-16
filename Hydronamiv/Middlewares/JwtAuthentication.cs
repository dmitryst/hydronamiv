using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Hydronamiv.Middlewares
{
    public static class JwtAuthentication
    {
        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, string issuer, string signingKey)
        {
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
                    {
                        // validate the server tht creted that token
                        ValidateIssuer = true,
                        // ensure that the recipient of the token is authorized to receive it
                        ValidateAudience = true,
                        // check that the token is not expired and that the signing key of the issuer is valid
                        ValidateLifetime = true,
                        // verify that the key used ti sign the incoming token is part of a list of trusted keys
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = issuer,
                        ValidAudience = issuer,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(signingKey))
                    };
                });

            return services;
        }
    }
}
