FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 500

ENV ASPNETCORE_URLS=http://+:5000

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["CarPool.api/CarPool.api.csproj", "CarPool.api/"]
RUN dotnet restore "CarPool.api\CarPool.api.csproj"
COPY . .
WORKDIR "/src/CarPool.api"
RUN dotnet build "CarPool.api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CarPool.api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CarPool.api.dll"]
