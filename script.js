/* Avery Vanacore 
Code works up to this.smartlinks.push(smartlink) (line 43), then fails with
error "Cannot push to undefined."  I am currently in the process of learning 
JavaScript and am a fast learner, so I feel confident that I would be adequately 
prepared for an internship in frontend programming this summer!
*/

function Smartlink(auctionID, DOMelement) {
    this.element = DOMelement;
    this.auctionID = auctionID;
    this.validAuctionID = function() {
        if (isNaN(this.auctionID)) {
            return false;
        } else {
            return true;
        }
    }
    this.runAuction = function() {
        return new Promise(function(resolve, reject) {
            resolve({ data: {
                destination_url: 'http://merchant.example/product/1',
                merchant_name: 'Sephora',
                product_name: 'Highlighter brush',
                price: '15.89',
            }});
        })
    }

    this.rewriteLink = function(URL, linkText) {
        this.element.href = URL;
        this.element.text = linkText;
    }
}

function Jstag() {
    this.smartlinks = new Array();
    function findAllSmartlinks() {
        document.addEventListener("DOMContentLoaded", function(e) {
            var links = document.getElementsByTagName("a");
            for (var link of links) {
                var href = link.getAttribute('href');
                var pattern = new RegExp("https?:\/\/shop-links.co\/*");
                if (pattern.test(href)) {
                    var fields = href.split('/');
                    var smartlink = new Smartlink(fields[3], "https://shop-links.co/");
                    if (smartlink.validAuctionID()) {
                        this.smartlinks.push(smartlink);
                    }
                }
            }
        });
    }

    this.runAllSmartlinks = function() {
        for (var smartlink in this.smartlinks) {
           var data = smartlink.runAuction();
           smartlink.rewriteLink(data.destination_url, `${data.product_name} $${data.price} at ${data.merchant_name}`);
        }
    }
    
    findAllSmartlinks();
}

Jstag();