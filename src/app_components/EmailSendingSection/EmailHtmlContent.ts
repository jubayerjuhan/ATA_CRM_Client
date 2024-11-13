export const itineraryHtmlContent = (link: string) => {
  return `<p style="margin-left:auto;"><span style="color: rgb(51,51,51);font-size: 16px;">Dear Customer</span><span style="color: rgb(51,51,51);font-size: 24px;">,</span>&nbsp;</p>
<p><span style="color: rgb(85,85,85);">Thank you for choosing Airways Travel.</span>&nbsp;</p>
<p><span style="color: rgb(85,85,85);">Please find your payment link below. Kindly click on the link and select your preferred payment option to complete your transaction.
</span> <br></p>
<p><span style="color: rgb(85,85,85);">If you have any questions or need assistance, please feel free to reach out. We appreciate your prompt response and thank you for your trust in Airways Travels.
</span> <br></p>
<p><span style="color: rgb(85,85,85);">---------------------------------------- Important Information ----------------------------------------</span> <br></p>
<p style="text-align:left;"><span style="color: black;font-size: 20px;" margin-bottom: 10px >If you agree, please click the button below:</span></p></br>
<a href="${link}" style="text-align:left; background-color: green;"><span style="color: black;font-size: 24px;" margin-bottom: 10px >Pay Now</span></a>

<div
  style="
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    color: #333;
  "
>
  <div
    style="
      text-align: left;
      display: flex;
      flex-direction: row;
      align-items: center;
    "
  >
    <img
      src="https://i.ibb.co.com/rvdQZqt/unnamed-6.png"
      alt="Airways travel Logo"
      style="
        width: 150px;
        height: 150px;
        max-height: 150px;
        max-width: 150px;
        margin-right: 15px;
        object-fit: contain;
      "
    />
    <div>
      <h2 style="margin: 0; color: #990000">Airways Travel</h2>
      <p style="margin: 0; color: #666">Airways Travel, Excellence in Travel</p>
    </div>
  </div>
  <div style="clear: both; padding-top: 20px; color: #333">
    <p style="margin: 0; line-height: 24px">
      <strong>Phone:</strong> 03 9041 3975 &nbsp;&nbsp;
      <strong>WhatsApp:</strong> 0432 936 702<br />
      <strong>Website:</strong>
      <a
        href="https://airwaystravel.com.au"
        style="color: #990000; text-decoration: none"
        >airwaystravel.com.au</a
      >
      &nbsp;&nbsp; <strong>Email:</strong>
      <a
        href="mailto:admin@airwaystravel.com.au"
        style="color: #990000; text-decoration: none"
        >admin@airwaystravel.com.au</a
      ><br />
      <strong>Address:</strong> 8 Tallis Cct, Truganina VIC 3029
    </p>
  </div>
  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0" />
  <img
    src="https://i.ibb.co.com/vDJMqLW/unnamed-7.png"
    alt="Banner Image"
    style="width: 100%; border-radius: 10px"
  />
  <div style="text-align: left; margin-top: 20px">
    <p style="font-size: 12px; color: #999">
      IMPORTANT: The contents of this email and any attachments are
      confidential. They are intended for the named recipient(s) only. If you
      have received this email by mistake, please notify the sender immediately
      and do not disclose the contents to anyone or make copies thereof.
    </p>
    <div style="margin-top: 20px">
      <a
        href="https://airwaystravel.com.au"
        style="text-decoration: none; color: #333; font-size: 13px"
      >
        ⭐ How did we do? <span style="color: #990000">Give us a review</span>
      </a>
      <br />
      <a
        href="https://airwaystravel.com.au"
        style="text-decoration: none; color: #333; font-size: 13px"
      >
        📧 Subscribe Now!
        <span style="color: #990000">Don’t miss a bargain</span>
      </a>
    </div>
  </div>
</div>

`;
};

// <div style="text-align:center; margin-top: 20px; width: 100%; text-align: center">
//   <p style="color: rgb(85,85,85); font-size: 16px;">If you agree, please click the button below:</p></br>
//   <a href="${link}">
//   <button style="background-color: red; font-weight: 800; color: white; padding: 10px 20px; font-size: 20px; border: none; border-radius: 5px; cursor: pointer;">I Acknowledge</button>
//   </a></br>
//   <p style="color: rgb(85,85,85); font-size: 16px; font-style:italic">(By acknowledging, you confirm that you have reviewed all the above details and agree with the provided information.)</p>
// </div>
export const ticketEmailContent = `<p style="margin-left:auto; line-height: 34px">Dear Traveler,&nbsp;</p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85);">Electronic Ticket Receipt is attached for you. Please take a printout of E-Ticket to present it when you check-in at the airport.</span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">NAME :</span> Please check your first name and surname as it must match with the passport and spellings should be correct.</span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">PASSPORT :</span> You are advised to have a passport valid for at least six months beyond the dates of your visit.</span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">VISA AND DOCUMENTATION RESPONSIBILITY :</span> It is your responsibility to ensure that you have the appropriate documentation including visas for the respective countries you intend to travel.</span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">INTERNATIONAL TRAVEL :</span> Reach airport 3 hours before the flight departure time.</span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">RECONFIRMATION :</span> We recommend you confirm your flight with us at least 72 hours prior to your departure . Any request within 48hrs of flight departure will not be guaranteed.</span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">HAND BAGGAGE :</span> You are allowed to carry one piece of 7kg in the hand carry.</span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85);"><span style="font-weight: bold; text-decoration: underline">CONTACT DETAILS OF (ARRIVAL DESTINATION) :</span> You are requested to update your arrival destination contact details (Phone/Mobile number & Email Address) with us before departure (in case of return Air tickets)</span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: red; margin-top: 10px">Travel advisories You are responsible for meeting all entry requirements for your destination. As travel regulations may change at short notice, we advise you to check the latest travel advisory.</span>&nbsp;<br/><br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85); margin-top: 10px">Regards,</span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85); margin-top: 10px">Airways Travel </span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85); margin-top: 10px">8 Tallis cct Truganina 3029 </span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85); margin-top: 10px">Toll Free 1300051525 </span>&nbsp;<br/></p>
<p style="margin-left:auto; line-height: 34px"><span style="color: rgb(85,85,85); margin-top: 10px">Phone     03-90413975</span>&nbsp;<br/></p>

`;
