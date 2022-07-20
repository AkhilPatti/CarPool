namespace CarPool.Services
{
    public interface ILoginSignupServices
    {
        bool Login(string email, string password);
        bool SignUp(string email, string password);
    }
}