const appId = '289432334256776';  // Replace with your Meta App ID
const signupButton = document.getElementById('signup-button');
const resultsDiv = document.getElementById('results');

window.fbAsyncInit = function() {
    FB.init({
      appId            : '289432334256776',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v19.0'
    });
  };


 // Facebook Login with JavaScript SDK
 function launchWhatsAppSignup() {
    // Launch Facebook login
    FB.login(function (response) {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        const code = response.authResponse.code;
        const wabaId = response.authResponse.extraData.waba_id;
        //Use this token to call the debug_token API and get the shared WABA's ID

         // **Security Note:** NEVER display the access token on the client-side
      console.log('Code:', code);
      console.log('WABA ID:', wabaId);

      resultsDiv.innerHTML = `
        <p>Code: ${code}</p>
        <p>WABA ID: ${wabaId}</p>
      `;


      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {
      config_id: '1482500692396703', // configuration ID obtained in the previous step goes here
      response_type: 'code',     // must be set to 'code' for System User access token
      override_default_response_type: true,
      extras: {
        setup: {
        }
      }
    });
  }

function startEmbeddedSignup() {
  FB.ui({
    method: 'embedded_signup',
    login_text: 'Log in to continue',
    new_user_text: 'Create a new Business Account',
    cancel_text: 'Cancel',
    // You can add additional options here based on your needs
    // Refer to Meta documentation for available options
  }, function(response) {
    if (response && response.authResponse) {
      const code = response.authResponse.code;
      const wabaId = response.authResponse.extraData.waba_id;
      const accessToken = response.authResponse.accessToken;

      // **Security Note:** NEVER display the access token on the client-side
      console.log('Code:', code);
      console.log('WABA ID:', wabaId);

      resultsDiv.innerHTML = `
        <p>Code: ${code}</p>
        <p>WABA ID: ${wabaId}</p>
      `;

      // Exchange the code for a server-side token with limited permissions
      // Implement server-side logic for secure token exchange
    } else {
      console.log('User cancelled signup');
    }
  });
}
