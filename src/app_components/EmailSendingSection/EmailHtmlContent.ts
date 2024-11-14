export const itineraryHtmlContent = (link: string) => {
  return `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Link</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
  <div>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px">
      <span style="color: rgb(85,85,85);">Dear Customer,</span><br/>
    </p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px">
      <span style="color: rgb(85,85,85);">Thank you for choosing Airways Travel.</span><br/>
    </p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px">
      <span style="color: rgb(85,85,85);">Please find your payment link below. Kindly click on the link and select your preferred payment option to complete your transaction.</span><br/>
    </p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px">
      <span style="color: rgb(85,85,85);">Please click the button below for payment options:</span><br/>
    </p>
    <p style="margin: 10px auto; margin-bottom: 20px; text-align: center;">
      <a href=${link} style="display: inline-block; background-color: #28a745; color: white; padding: 15px 30px; font-size: 24px; font-weight: bold; border-radius: 8px; text-decoration: none; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2); transition: background-color 0.3s, transform 0.2s;" onmouseover="this.style.backgroundColor='#218838'; this.style.transform='scale(1.05)';" onmouseout="this.style.backgroundColor='#28a745'; this.style.transform='scale(1)';">Pay Now</a>
    </p>
    <br/>
    <p style="margin-left:auto; margin-bottom: 10px; margin-top: 10px; line-height: 34px">
      <span style="color: rgb(85,85,85);">If you have any questions or need assistance, please feel free to reach out. We appreciate your prompt response and thank you for your trust in Airways Travels.</span><br/>
    </p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px">
      <span style="color: rgb(85,85,85);">Regards,</span><br/>
    </p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px">
      <span style="color: rgb(85,85,85);">Support Team</span><br/>
    </p>
  </div>
  
</body>
</html>
  `;
};

// <div style="text-align:center; margin-top: 20px; width: 100%; text-align: center">
//   <p style="color: rgb(85,85,85); font-size: 16px;">If you agree, please click the button below:</p></br>
//   <a href="${link}">
//   <button style="background-color: red; font-weight: 800; color: white; padding: 10px 20px; font-size: 20px; border: none; border-radius: 5px; cursor: pointer;">I Acknowledge</button>
//   </a></br>
//   <p style="color: rgb(85,85,85); font-size: 16px; font-style:italic">(By acknowledging, you confirm that you have reviewed all the above details and agree with the provided information.)</p>
// </div>
export const ticketEmailContent = `
<div>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px"><span style="color: rgb(85,85,85);">Dear Traveler,</span>&nbsp;<br/></p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px"><span style="color: rgb(85,85,85);">Electronic Ticket Receipt is attached for you. Please take a printout of E-Ticket to present it when you check-in at the airport.</span>&nbsp;<br/></p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">NAME :</span> Please check your first name and surname as it must match with the passport and spellings should be correct.</span>&nbsp;<br/></p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">PASSPORT :</span> You are advised to have a passport valid for at least six months beyond the dates of your visit.</span>&nbsp;<br/></p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">VISA AND DOCUMENTATION RESPONSIBILITY :</span> It is your responsibility to ensure that you have the appropriate documentation including visas for the respective countries you intend to travel.</span>&nbsp;<br/></p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">INTERNATIONAL TRAVEL :</span> Reach airport 3 hours before the flight departure time.</span>&nbsp;<br/></p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">RECONFIRMATION :</span> We recommend you confirm your flight with us at least 72 hours prior to your departure . Any request within 48hrs of flight departure will not be guaranteed.</span>&nbsp;<br/></p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">HAND BAGGAGE :</span> You are allowed to carry one piece of 7kg in the hand carry.</span>&nbsp;<br/></p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">CONTACT DETAILS OF (ARRIVAL DESTINATION) :</span> You are requested to update your arrival destination contact details (Phone/Mobile number & Email Address) with us before departure (in case of return Air tickets)</span>&nbsp;<br/></p>
    <p style="margin-left:auto; margin-bottom: 10px; line-height: 34px"><span style="color: red; margin-top: 10px">Travel advisories You are responsible for meeting all entry requirements for your destination. As travel regulations may change at short notice, we advise you to check the latest travel advisory.</span>&nbsp;<br/><br/></p>
</div>
`;
