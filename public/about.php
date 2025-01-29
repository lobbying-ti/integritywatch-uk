<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta property="og:url" content="https://openaccess.transparency.org.uk" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Open Access UK: monitor lobbying meetings with Government" />
    <meta property="og:description" content="Who’s #lobbying the UK Parliament? Check Open Access UK" />
    <meta property="og:image" content="https://openaccess.transparency.org.uk/images/thumbnail.png" />
    <title>About</title>
    <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Quicksand:500" rel="stylesheet">
    <link rel="stylesheet" href="static/about.css">
</head>
<body>
    <?php include 'header.php' ?>

    <div id="app" class="aboutPage">    
      <div class="container">
        <div class="panel-group" id="accordion">
          <!-- BLOCK 1 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">1. ABOUT</a>
              </h1>
            </div>
            <div id="collapse1" class="panel-collapse collapse in">
              <div class="panel-body">
                <p>Open Access UK is a free-to-use transparency tool. It allows you to understand who is meeting with UK Government ministers, Scottish Government ministers, and Members of the Scottish Parliament, when and for what purpose.</p>
				We source this data from <a href="https://www.gov.uk/government/government-efficiency-transparency-and-accountability">UK Government transparency disclosures</a> and the <a href="https://www.parliament.scot/get-involved/lobbying/lobbying-register">Scottish statutory register of lobbyists</a>. We collect, harmonise and make this data readily available so it is easier for you to search and analyse.<br><br>
				
Open Access UK includes a range of functions, allowing users to:

<li>search, rank and filter the data</li>
<li> download the data in Comma Separated Value (CSV) format</li>
<li> share links to specific meetings on social media</li>
<li> submit pre-populated freedom of information requests via  WhatDoTheyKnow.com<sup>1</sup></li><br>

                <p>We use cutting-edge AI based large language models to automatically categorise lobbying meetings. These models are great at categorising lobbying descriptions because they are trained on two key things: understanding language like humans do and processing vast amounts of information across many fields. They combine their language skills with their broad knowledge to make connections, helping them spot the real topic of a meeting even when it's not clearly stated.

				Our system analyses the meeting descriptions, hosts, and lobbyists to determine what each meeting is about. We currently use four categories: Health, Housing, Defence and Climate.
To make this work, we first taught our models using 2,000 real lobbying meetings that were manually labeled by our team. This training helps the AI understand the nuances of lobbying language and topics.
Now, whenever new meeting data is released, our AI can quickly sort through it and categorise each meeting. This approach is highly accurate, but like any AI system, it might occasionally misclassify a meeting.</p>
<br>			  <p><sup>1</sup> Elected representatives such as MSPs are not directly covered by FOI law. FOI applies to public authorities - and elected members are individuals, not public authorities. If MSPs receive a request for information using Open Access, MSPs may choose to answer them, but they are not required to do so by FOI law.</p>

              </div>
            </div>
          </div>
          <!-- BLOCK 2 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">2. WHY TRANSPARENCY IS IMPORTANT</a>
              </h1>
            </div>
            <div id="collapse2" class="panel-collapse collapse in">
              <div class="panel-body">
			  <p>Politicians and public officials are expected to observe the <a href="https://www.gov.uk/government/publications/the-7-principles-of-public-life/the-7-principles-of-public-life--2" target="_blank">Seven Principles of Public Life</a> and their relevant codes of conduct:</p>
<ul>
  <li><a href="https://www.gov.uk/government/publications/ministerial-code" target="_blank">UK ministers </a></li>
  <li>UK Parliament (Commons and Lords)</li>
  <li><a href="https://www.gov.scot/publications/scottish-ministerial-code-2023-edition/" target="_blank">Scottish ministers </a></li>
  <li> <a href="https://www.parliament.scot/msps/code-of-conduct" target="_blank">Scottish Parliament</a></li>
</ul>

<p>When the letter and spirit of these rules are not followed, it can give rise to the perception that those entrusted with public office are abusing it for private gain. This can include:</p>
<ul>
  <li>using their position to solicit donations in return for political access whilst they are acting in their capacity as a senior member of a political party</li>
  <li>bringing friends or close associates along to official meetings, which could provide them with preferential business opportunities</li>
  <li>using their time in office to secure future employment with those they interact with in their official duties</li>
</ul>

<p>There are also concerns that disproportionate access to decision-makers is secured by powerful private interests, which can distort government policy to the detriment of the public interest.</p>

<p>This tool can help enable citizens, journalists, and civil society to identify and investigate potential wrongdoing, and seek action when politicians, public officials, or those they meet have acted improperly.</p>

<p>We have included a link to <a href="https://www.whatdotheyknow.com/" target="_blank">WhatDoTheyKnow</a> to help users make Freedom of Information requests on any meetings they want to interrogate in more detail.</p>

              </div>
            </div>
          </div>
          <!-- BLOCK 3 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse3">3. WHERE THIS DATA COMES FROM</a>
              </h1>
            </div>
            <div id="collapse3" class="panel-collapse collapse in">
              <div class="panel-body">
<p><strong>UK</strong></p>
<p>The Ministerial Code requires UK Government departments to publish the details of ministers’ meetings with external organisations quarterly. This should cover all external meetings ministers have while on official business. It does not include meetings ministers have in their capacity as a member of a political party. Government Digital Service provides departments with <a href="https://www.gov.uk/guidance/how-to-publish-ministerial-gifts-hospitality-travel-and-meetings">guidance</a> on how to publish this data.</p>
<p>Compliance with the code is overseen by the Propriety and Ethics Team in the Cabinet Office.</p>
<p>All data on Ministers’ meetings with external organisations is <a href="https://www.gov.uk/government/government-efficiency-transparency-and-accountability">published on UK Government departments’ websites.</a>.</p>

<p><strong>Scotland</strong></p>
<p>The Lobbying (Scotland) Act 2016 <a href="https://www.legislation.gov.uk/asp/2016/16/contents">requires lobbyists</a> to report information about face-to-face and video conference calls with Scottish Ministers and Members of the Scottish Parliament within six months of it taking place. Lobbyists must submit details about these engagements to the Scottish Parliament, who publishes these returns on the Lobbying Register. You can access the <a href="https://www.lobbying.scot/SPS/LobbyingRegister/SearchLobbyingRegister">Lobbying Register</a>. Lobbying via phone call, messaging, letter, email or other forms of communication that are not face-to-face or video conference are not currently regulated, and therefore not on the register.</p>

              </div>
            </div>
          </div>
          <!-- BLOCK 4 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h1 class="panel-title">
                <a data-toggle="collapse" data-parent="#accordion" href="#collapse4">4. NOTES ON THE DATA</a>
              </h1>
            </div>
            <div id="collapse4" class="panel-collapse collapse in">
              <div class="panel-body">
 <p>Currently the tool includes UK Government data from 2012. We aim to publish updates to UK ministerial meetings data within a month of their publication on departments' websites. Data on meetings between 2010 to 2017 were collected using scripts developed by the University of Oxford. The <a href="https://github.com/ianknowles/EarTimeWrangler" target="_blank">GitHub repository for these scripts</a> can be found here. There are many inaccuracies and inconsistencies in the original data that we have sought to address through manual checks and, where necessary, manual data entry.</p> <h3>CHANGES WE HAVE MADE</h3> <p>Corrected dates where this is an obvious error, for example, if a meeting is reported to have been published in 2104.</p> <p>Completed incomplete date values, for example, if a meeting is reported to have taken place in June and no specific day has been given. As a default we have set these dates to the first day of the relevant month, for example, "June 2017" is corrected to "01/06/2017".</p> <p>Standardised the names of ministers so it is easier for users to search.</p> <p>Used data from <a href="http://www.data.parliament.uk/" target="_blank">data.parliament.uk</a> to categorise the seniority of UK Government ministers.</p> <p>Included the unique identifier <a href="http://data.parliament.uk/membersdataplatform/memberquery.aspx" target="_blank">data.parliament.uk</a> assigns to Parliamentarians in our data to allow users to link this dataset with other data published by the UK Parliament and third parties, like <a href="https://www.theyworkforyou.com/" target="_blank">mySociety's TheyWorkForYou tool</a>.</p> <h3>CHANGES WE HAVE NOT MADE</h3> <p>We have not tried to standardise the names of organisations meeting with UK Government ministers.</p> <h3>DISCLAIMER</h3> <p><strong>Although we have taken all reasonable measures to ensure the data we publish is as accurate as possible, we recommend you always check any findings from the tool against the <a href="https://www.gov.uk/government/government-efficiency-transparency-and-accountability" target="_blank">source data on UK Government departments' websites</a> and the <a href="https://www.lobbying.scot/SPS/LobbyingRegister/SearchLobbyingRegister" target="_blank">Scottish Register of Lobbyists</a>.</strong></p> <h3>LICENCE</h3> <p>The tool contains public sector information licenced under the <a href="http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" target="_blank">Open Government Licence v3.0</a> and UK Parliamentary information licenced under the <a href="https://www.parliament.uk/site-information/copyright/open-parliament-licence/" target="_blank">Open Parliament Licence v3.0</a>. The data is published under the <a href="https://opendatacommons.org/licenses/odbl/" target="_blank">Open Data Commons Open Database License (ODbL)</a>.</p>
              </div>
            </div>
          </div>
          <!-- CONTACTS -->
          <div class="panel panel-default panel-static">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a href="#">CONTACT DETAILS</a>
              </h2>
            </div>
            <div id="contact" class="panel-collapse">
              <div class="panel-body">
                <p>If your questions have not been answered here please contact:</p>
                <p>
                + 44 (0)20 3096 7676
                <a href="mailto:info@transparency.org.uk">info@transparency.org.uk</a>
                </p>
              </div>
            </div>
          </div>
          <!-- SPONSORS -->
          <div class="panel panel-default panel-static">
            <div class="panel-heading">
              <h2 class="panel-title">
                <a href="#">PROJECT SPONSORS</a>
              </h2>
            </div>
            <div id="contact" class="panel-collapse">
              <div class="panel-body">
<p>The project is co-funded by the University of Oxford through a grant from the <a href="https://www.ukri.org/councils/esrc/" target="_blank">Economic and Social Research Council (ESRC) Impact Acceleration Account</a>, the <a href="https://www.jrct.org.uk/" target="_blank">Joseph Rowntree Charitable Trust (JRCT)</a>, The Amberstone Trust, <a href="https://omidyar.com/" target="_blank">Omidyar Network</a>, <a href="https://transparency.eu/" target="_blank">Transparency International EU (TI EU)</a>, the <a href="https://www.juliahansrausingtrust.org/" target="_blank">Julia ands Hans Rausing Trust</a>, and <a href="https://www.waverleystreet.org/welcome" target="_blank">The Waverley Street Foundation (WSF)</a>.</p> <p>The tool publishing the data is co-funded by the <a href="https://www.opensocietyfoundations.org" target="_blank">Open Society Initiative for Europe (OSIFE)</a>, with a contribution by the <a href="https://kbs-frb.be/en" target="_blank">King Baudouin Foundation (KBF)</a>.</p> <p>You can help contribute to this tool by donating online. <a href="https://www.transparency.org.uk/donate" target="_blank">https://www.transparency.org.uk/donate</a> Please contact us if you wish to donate via another means at info@transparency.org.uk</p> <p>Website design and development: <a href="https://www.chiaragirardelli.net/" target="_blank">Chiara Girardelli</a> and <a href="https://www.linkedin.com/in/tom-wright-29b585144/" target="_blank">Tom Wright</a></p> <p>The technology behind the platform (D3.js) was developed by the New York Times in order to make complex datasets accessible to a wider audience. <a href="https://d3js.org/" target="_blank">https://d3js.org/</a></p>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <script src="static/about.js"></script>
</body>
</html>