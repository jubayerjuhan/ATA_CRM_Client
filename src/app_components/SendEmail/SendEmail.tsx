import React, { useState } from "react";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs"; // Import this for HTML to Draft.js conversion

import "./SendEmail.scss";
import { Button } from "@/components/ui/button";
import { client } from "@/api/api";

export const SendEmail = () => {
  // Example HTML content you want to set as default
  const defaultHtml = `<p style="margin-left:auto;">&nbsp;<span style="color: rgb(51,51,51);background-color: white;font-size: 16px;">Dear Customer</span><span style="color: rgb(51,51,51);background-color: white;font-size: 24px;">,</span>&nbsp;</p>
<p><span style="color: rgb(85,85,85);background-color: white;">Thank you for choosing Airways Travel.</span>&nbsp;</p>
<p><span style="color: rgb(85,85,85);background-color: white;">Before finalizing your booking, we urge you to thoroughly check the details below for accuracy, including dates, names, and all applicable terms and conditions.</span> <br></p>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;">Important Information Regarding Your Booking:</span>&nbsp;&nbsp;</h2>
<ul>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Itinerary Overview:</strong> This booking includes 3 tickets as detailed below.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Ticket Validity:</strong> Tickets remain valid until the travel dates specified.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Baggage Allowance:</strong> Each Adult/Child is entitled to 2pc 23kg of each piece (46kg) of checked baggage plus one piece of cabin baggage not exceeding 7kg.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Date Change Charges:</strong> AUD 380 Plus fare and tax difference. No Show if applicable.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Cancellation Policy:</strong> AUD 550 Each ticket. Tickets are non-refundable in case of No-Show.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Seating Assignments:</strong> Seats will be allocated at the airport or at the time of check-in.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Passport Requirements:</strong> Passports must remain valid for at least 6 months beyond the return date of travel.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Visa and Immigration:</strong> It is the passenger's responsibility to ensure they have the required visa for the destination and any transit countries.</span> <br>&nbsp;</li>
</ul>
<p><span style="color: rgb(217,83,79);background-color: white;"><strong>*Please note*: Changes and cancellations to bookings must be made more than 72 hours prior to flight departure, as charges can vary within 72 hours of departure. Domestic tickets and partially used tickets are non-refundable.</strong></span>&nbsp;</p>
<p><span style="color: rgb(217,83,79);background-color: white;"><strong>*Airways Travel Disclaimer*: Airways Travel is not liable for any schedule changes or cancellations made by the airline.</strong></span> <br></p>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;">Flight Confirmation Reminder:</span>&nbsp;</h2>
<p><span style="color: rgb(85,85,85);background-color: white;">We recommend you confirm your flight with us at least <strong>72 hours</strong> prior to your departure. Please note that any request made within <strong>48 hours of flight departure</strong> will not be guaranteed.</span>&nbsp;</p>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;">Airport Arrival Recommendations:</span>&nbsp;&nbsp;</h2>
<ul>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>For International Travel:</strong> Reach the airport <strong>3 hours</strong> before the flight departure time.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>For Domestic Travel:</strong> Reach the airport <strong>90 minutes</strong> before the flight departure time.</span>&nbsp;&nbsp;</li>
</ul>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;">Passenger Details:</span>&nbsp;</h2>
<p><span style="color: rgb(85,85,85);background-color: white;">It is crucial that names are accurately reflected as per the passport. It is the passenger's responsibility to verify and ensure their name matches their passport.</span>&nbsp;&nbsp;</p>
<ul>
<li><span style="color: rgb(85,85,85);background-color: white;">First Name: Mohammad Mahbubur Mr</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;">Last Name: Rahman</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;">First Name: Tasniya Tahsin Ms</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;">Last Name: Rahman</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;">First Name: Jannatul Ms</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;">Last Name: Ferdaus</span>&nbsp;&nbsp;</li>
</ul>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;">Itinerary</span>&nbsp;</h2>
<p><span style="color: rgb(85,85,85);background-color: white;">1. Rahman, Mohammad Mahbubur Mr</span></p>
<p><span style="color: rgb(85,85,85);background-color: white;">2. Rahman, Tasniya Tahsin Ms</span></p>
<p><span style="color: rgb(85,85,85);background-color: white;">3. Ferdaus, Jannatul Ms</span>&nbsp;</p>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;"><br>Flight Details</span>&nbsp;</h2>
<p><span style="color: rgb(85,85,85);background-color: white;"><strong>Sydney - Dhaka</strong></span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           CZ 326</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           DEPART: Kingsford Smith, Sydney (SYD)</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Saturday 23 November 2024, 11:25</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           ARRIVE: Baiyun Intl, Guangzhou (CAN)</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Saturday 23 November 2024, 17:50</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Duration: 9h 25m | Cabin Class: Economy</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Airline: China Southern | Aircraft: Airbus A350</span> <br></p>
<p><span style="color: rgb(85,85,85);background-color: white;"><strong>Return Flight: Dhaka - Sydney</strong></span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           CZ 392</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           DEPART: Hazrat Shahjalal Intl, Dhaka (DAC)</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Saturday 07 December 2024, 20:30</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           ARRIVE: Kingsford Smith, Sydney (SYD)</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Sunday 08 December 2024, 17:25</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Duration: 12h 55m | Cabin Class: Economy</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Airline: China Southern | Aircraft: Airbus A35</span></p>
<p></p>
<p style="text-align:center;"><span style="color: rgb(153,153,153);background-color: white;font-size: 14px;">Thank you for choosing Airways Travel!</span></p>
<p style="text-align:center;"><span style="color: rgb(153,153,153);background-color: white;font-size: 14px;">For any inquiries, please contact us at support@airwaystravel.com.<br>        </span>&nbsp;</p>

2SendEmail.tsx:96 <p style="margin-left:auto;">&nbsp;<span style="color: rgb(51,51,51);background-color: white;font-size: 16px;">Dear Customer</span><span style="color: rgb(51,51,51);background-color: white;font-size: 24px;">,</span>&nbsp;</p>
<p><span style="color: rgb(85,85,85);background-color: white;">Thank you for choosing Airways Travel.</span>&nbsp;</p>
<p><span style="color: rgb(85,85,85);background-color: white;">Before finalizing your booking, we urge you to thoroughly check the details below for accuracy, including dates, names, and all applicable terms and conditions.</span> <br></p>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;">Important Information Regarding Your Booking:</span>&nbsp;&nbsp;</h2>
<ul>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Itinerary Overview:</strong> This booking includes 3 tickets as detailed below.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Ticket Validity:</strong> Tickets remain valid until the travel dates specified.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Baggage Allowance:</strong> Each Adult/Child is entitled to 2pc 23kg of each piece (46kg) of checked baggage plus one piece of cabin baggage not exceeding 7kg.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Date Change Charges:</strong> AUD 380 Plus fare and tax difference. No Show if applicable.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Cancellation Policy:</strong> AUD 550 Each ticket. Tickets are non-refundable in case of No-Show.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Seating Assignments:</strong> Seats will be allocated at the airport or at the time of check-in.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Passport Requirements:</strong> Passports must remain valid for at least 6 months beyond the return date of travel.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>Visa and Immigration:</strong> It is the passenger's responsibility to ensure they have the required visa for the destination and any transit countries.</span> <br>&nbsp;</li>
</ul>
<p><span style="color: rgb(217,83,79);background-color: white;"><strong>*Please note*: Changes and cancellations to bookings must be made more than 72 hours prior to flight departure, as charges can vary within 72 hours of departure. Domestic tickets and partially used tickets are non-refundable.</strong></span>&nbsp;</p>
<p><span style="color: rgb(217,83,79);background-color: white;"><strong>*Airways Travel Disclaimer*: Airways Travel is not liable for any schedule changes or cancellations made by the airline.</strong></span> <br></p>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;">Flight Confirmation Reminder:</span>&nbsp;</h2>
<p><span style="color: rgb(85,85,85);background-color: white;">We recommend you confirm your flight with us at least <strong>72 hours</strong> prior to your departure. Please note that any request made within <strong>48 hours of flight departure</strong> will not be guaranteed.</span></p>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;">Airport Arrival Recommendations:</span>&nbsp;&nbsp;</h2>
<ul>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>For International Travel:</strong> Reach the airport <strong>3 hours</strong> before the flight departure time.</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;"><strong>For Domestic Travel:</strong> Reach the airport <strong>90 minutes</strong> before the flight departure time.</span>&nbsp;&nbsp;</li>
</ul>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;">Passenger Details:</span>&nbsp;</h2>
<p><span style="color: rgb(85,85,85);background-color: white;">It is crucial that names are accurately reflected as per the passport. It is the passenger's responsibility to verify and ensure their name matches their passport.</span>&nbsp;&nbsp;</p>
<ul>
<li><span style="color: rgb(85,85,85);background-color: white;">First Name: Mohammad Mahbubur Mr</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;">Last Name: Rahman</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;">First Name: Tasniya Tahsin Ms</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;">Last Name: Rahman</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;">First Name: Jannatul Ms</span>&nbsp;</li>
<li><span style="color: rgb(85,85,85);background-color: white;">Last Name: Ferdaus</span>&nbsp;&nbsp;</li>
</ul>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;">Itinerary</span>&nbsp;</h2>
<p><span style="color: rgb(85,85,85);background-color: white;">1. Rahman, Mohammad Mahbubur Mr</span></p>
<p><span style="color: rgb(85,85,85);background-color: white;">2. Rahman, Tasniya Tahsin Ms</span></p>
<p><span style="color: rgb(85,85,85);background-color: white;">3. Ferdaus, Jannatul Ms</span>&nbsp;</p>
<h2><span style="color: rgb(0,123,255);background-color: white;font-size: 20px;"><br>Flight Details</span>&nbsp;</h2>
<p><span style="color: rgb(85,85,85);background-color: white;"><strong>Sydney - Dhaka</strong></span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           CZ 326</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           DEPART: Kingsford Smith, Sydney (SYD)</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Saturday 23 November 2024, 11:25</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           ARRIVE: Baiyun Intl, Guangzhou (CAN)</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Saturday 23 November 2024, 17:50</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Duration: 9h 25m | Cabin Class: Economy</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Airline: China Southern | Aircraft: Airbus A350</span> <br></p>
<p><span style="color: rgb(85,85,85);background-color: white;"><strong>Return Flight: Dhaka - Sydney</strong></span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           CZ 392</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           DEPART: Hazrat Shahjalal Intl, Dhaka (DAC)</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Saturday 07 December 2024, 20:30</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           ARRIVE: Kingsford Smith, Sydney (SYD)</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Sunday 08 December 2024, 17:25</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Duration: 12h 55m | Cabin Class: Economy</span><br><span style="color: rgb(85,85,85);background-color: white;"><br>           Airline: China Southern | Aircraft: Airbus A35</span></p>
<p></p>
<p style="text-align:center;"><span style="color: rgb(153,153,153);background-color: white;font-size: 14px;">Thank you for choosing Airways Travel!</span></p>
<p style="text-align:center;"><span style="color: rgb(153,153,153);background-color: white;font-size: 14px;">For any inquiries, please contact us at support@airwaystravel.com.<br>        </span>&nbsp;</p>
`;

  // Convert HTML to Draft.js content state
  const contentBlock = htmlToDraft(defaultHtml);
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );

  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  const handleSendEmail = async () => {
    try {
      const { data } = await client.post("/email/send-email", {
        htmlContent: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <Editor
        editorState={editorState} // Changed to editorState instead of defaultEditorState
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />

      <Button onClick={handleSendEmail}>Send Email</Button>

      <div
        dangerouslySetInnerHTML={{
          __html: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        }}
      ></div>
    </div>
  );
};
