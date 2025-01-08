from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import AnonymousUser
import jwt
import requests
from apps.organizations.models import Organization
class Auth0User:
    """
    A simple proxy object for representing a user authenticated via Auth0.
    """
    def __init__(self, payload):
        self.payload = payload
        self.is_authenticated = True
        self.organization=Organization.objects.get(id='1e24bb34-0670-4487-b183-1993b0abe48a')

    def __getattr__(self, name):
        """
        Allow access to attributes in the JWT payload.
        """
        return self.payload.get(name, None)


class Auth0JWTAuthentication(BaseAuthentication):
    AUTH0_DOMAIN = "dev-f24a2x0fq3i4k253.us.auth0.com"  # Replace with your Auth0 domain
    API_IDENTIFIER = "https://dev-f24a2x0fq3i4k253.us.auth0.com/api/v2/"  # Replace with your audience
    JWKS_URL = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    ISSUER = f"https://{AUTH0_DOMAIN}/"

    def get_public_key(self, token):
        """
        Retrieve the public key from Auth0's JWKS.
        """
        try:
            # Fetch JWKS
            jwks = requests.get(self.JWKS_URL).json()
            unverified_header = jwt.get_unverified_header(token)
            for key in jwks["keys"]:
                if key["kid"] == unverified_header["kid"]:
                    return jwt.algorithms.RSAAlgorithm.from_jwk(key)
            raise AuthenticationFailed("Public key not found in JWKS.")
        except Exception as e:
            raise AuthenticationFailed(f"Failed to retrieve public key: {str(e)}")

    def authenticate(self, request):
        """
        Authenticate the user using the Authorization header and JWT validation.
        """
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None  # No authentication performed

        if not auth_header.startswith("Bearer "):
            raise AuthenticationFailed("Authorization header must start with Bearer.")

        token = auth_header.split()[1]  # Extract the token

        try:
            # Retrieve and verify the JWT
            public_key = self.get_public_key(token)
            payload = jwt.decode(
                token,
                key=public_key,
                algorithms=["RS256"],
                audience=self.API_IDENTIFIER,
                issuer=self.ISSUER,
            )
            user = Auth0User(payload)  # Wrap the payload in the Auth0User class
            return (user, token)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token has expired.")
        except jwt.InvalidTokenError as e:
            raise AuthenticationFailed(f"Invalid token: {str(e)}")
