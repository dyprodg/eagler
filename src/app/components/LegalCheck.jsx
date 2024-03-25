const LegalCheck = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-background" onClick={onClose}>
            <div className="modal-content border rounded-xl bg-slate-600 bumpup p-8 m-4" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <div className="w-full h-full flex flex-col justify-center">
                    <div class="container mx-auto py-8 text-xs">
                            <h1 class="text-xl font-semibold mb-4">Terms and Conditions (AGB)</h1>
                            <p class="text-gray-700 mb-4">This website (&quot;Eagler&quot;) justanothersocialmedia.net is provided for educational purposes and as a non-profit project. By
                                accessing or using this website, you agree to these terms and conditions:</p>

                            <ul class="list-disc pl-8 mb-4">
                                <li>This website is provided &quot;as is&quot; and without warranty of any kind, express or implied.</li>
                                <li>The owner of this website (Dennis Diepolder) does not take any responsibility for the accuracy, completeness, or
                                    suitability of the information and materials found or offered on this website.</li>
                                <li>Use of any information or materials on this website is entirely at your own risk.</li>
                                <li>This website may contain links to other websites which are not under the control of the owner. The owner has no
                                    control over the nature, content, and availability of those sites.</li>
                            </ul>

                            <h1 class="text-lg font-semibold mb-4">Data Security and Privacy</h1>
                            <p class="text-gray-700 mb-4">Protecting your privacy is important to us. Any personal information you provide while using this
                                website will be handled in accordance with our privacy policy:</p>

                            <ul class="list-disc pl-8 mb-4">
                                <li>We do not collect any personal information from users of this website besides the email adress. If you upload pictures of yourself or anyone else <br></br>
                                they could end up public so do upload with care.</li>
                                <li>This website only uses cookies that are nessary for the website to work</li>
                                <li>Any data collected by third-party services integrated into this website is subject to their respective privacy
                                    policies.</li>
                                <li>We do not sell, trade, or otherwise transfer your personal information to third parties.</li>
                            </ul>

                            <p class="text-gray-700">By using this website, you acknowledge that you have read, understood, and agree to these terms and
                                conditions, as well as our privacy policy.</p>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default LegalCheck;