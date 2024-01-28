//const XeroClient = require('xero-node').AccountingAPIClient;
const { XeroClient } = require('xero-node');
require('dotenv').config();


const configer = {
  clientId: process.env.XERO_CLIENT_ID,
  clientSecret: process.env.XERO_CLIENT_SECRET,
  redirectUris: [process.env.XERO_REDIRECT_URI],
  scopes: process.env.XERO_SCOPE.split(' '),
};

const xero = new XeroClient(configer)
//console.log(xero);


// exports.handleXeroCallback = async (req, res) => {
//     try {
//       const tokenSet = await xero.apiCallback(req.url);
//       req.session.xeroTokenSet = tokenSet;
//       res.send('Connected to Xero!');
//     } catch (error) {
//       console.error('Error during Xero callback:', error.message);
//       res.status(500).send('Internal Server Error');
//     }
//   };



const redirectToXero = async(req, res) => {
  const authorizeUrl = await xero.buildConsentUrl();
  console.log("autherize url pass", authorizeUrl)
  await res.redirect(authorizeUrl);
  console.log("test 1s")
};

const handleXeroCallback = async (req, res) => {
    try {
      const tokenSet = await xero.apiCallback(req.url);
      console.log("Token set received:", tokenSet);
      req.session.xeroTokenSet = tokenSet;
      res.send('Connected to Xero!');
    } catch (error) {
      console.error('Error during Xero callback:', error);
      console.error('Error details:', error.message, error.error_description);
      //console.error('Raw response:', error.response);
      res.status(500).send('Internal Server Error');
    }
  };
  
  

  const fetchUserDetails = async (req, res) => {
    try {
      xero.setTokenSet(req.session.xeroTokenSet);
      const user = await xero.users.me();
      res.json(user);
    } catch (error) {
      console.error('Error fetching user details:', error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  const isAccessTokenExpired = (tokenSet) => {
    return xero.isAccessTokenExpired(tokenSet);
  };
  
  const refreshAccessToken = async (refreshToken) => {
    return xero.refreshWithRefreshToken(refreshToken);
  };
  
  const refreshAccessTokenIfNeeded = async (req, res, next) => {
    const tokenSet = req.session.xeroTokenSet;
  
    if (tokenSet && isAccessTokenExpired(tokenSet)) {
      try {
        const refreshedTokenSet = await refreshAccessToken(tokenSet.refresh_token);
        req.session.xeroTokenSet = refreshedTokenSet;
        console.log('Access token refreshed:', refreshedTokenSet.access_token);
      } catch (error) {
        console.error('Error refreshing access token:', error);
      }
    }
  
    next();
  };
  


module.exports = {redirectToXero, handleXeroCallback, fetchUserDetails, refreshAccessTokenIfNeeded }