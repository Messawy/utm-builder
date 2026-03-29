import { useState, useMemo, useCallback, useEffect } from "react";

const D = {
  platforms:[{code:"meta",full:"Meta (FB/IG)",medium:"paid-social"},{code:"google",full:"Google Ads - Search",medium:"paid-search"},{code:"google-yt",full:"Google Ads - Display/YT",medium:"paid-video"},{code:"tiktok",full:"TikTok Ads",medium:"paid-social"},{code:"snapchat",full:"Snapchat Ads",medium:"paid-social"}],
  types:[{code:"pros",full:"Prospecting"},{code:"reta",full:"Retargeting"}],
  objectives:[{code:"sales",full:"Conversion / Sales",plat:"All"},{code:"vid",full:"Video Views",plat:"All"},{code:"cat",full:"Catalog Sales",plat:"All"},{code:"adv",full:"Advantage+ Meta",plat:"Meta"},{code:"srch",full:"Search",plat:"Google, TikTok"},{code:"dgen",full:"Demand Gen",plat:"Google"},{code:"app",full:"App Promotion",plat:"All"},{code:"pmax",full:"Google PMax",plat:"Google"},{code:"smart",full:"TikTok/Snap Smart",plat:"TikTok, Snap"},{code:"test-sales",full:"Testing Sales",plat:"All"},{code:"test-adv",full:"Testing Advantage+",plat:"Meta"},{code:"test-smart",full:"Testing Smart",plat:"TikTok, Snap"},{code:"test-pmax",full:"Testing PMax",plat:"Google"}],
  collections:[
    {code:"all",full:"All Aleena's Women Dresses",cat:"Core",url:"https://shopaleena.com/ar/collections/all-aleena"},
    {code:"al2",full:"Shop All Products",cat:"General",url:"https://shopaleena.com/ar/collections/all"},
    {code:"aps",full:"Aleena Premium Service",cat:"Internal",url:"https://shopaleena.com/ar/collections/aleena-premium-service"},
    {code:"al1",full:"Silk Eye Masks & Pillowcases",cat:"Home",url:"https://shopaleena.com/ar/collections/aleena-home-silk"},
    {code:"bac",full:"Back In Stock",cat:"Core",url:"https://shopaleena.com/ar/collections/back-in-stock"},
    {code:"btw",full:"Work & Formal Wear",cat:"General",url:"https://shopaleena.com/ar/collections/back-to-work"},
    {code:"bag",full:"Bags Collection",cat:"Core",url:"https://shopaleena.com/ar/collections/bags-collection"},
    {code:"ba1",full:"Basic Dresses",cat:"Special",url:"https://shopaleena.com/ar/collections/basic-dresses"},
    {code:"bas",full:"Aleena's Basics",cat:"Special",url:"https://shopaleena.com/ar/collections/basics-collection"},
    {code:"bea",full:"Beach Dresses",cat:"General",url:"https://shopaleena.com/ar/collections/beachwear"},
    {code:"bes",full:"Best Seller Dresses",cat:"Core",url:"https://shopaleena.com/ar/collections/best-seller-womens-dresses"},
    {code:"bri",full:"Bride-to-Be Wardrobe",cat:"Core",url:"https://shopaleena.com/ar/collections/bride-to-be-wardrobe"},
    {code:"dai",full:"Daily Outfits",cat:"Core",url:"https://shopaleena.com/ar/collections/daily"},
    {code:"day",full:"Casual & Day Wear",cat:"Core",url:"https://shopaleena.com/ar/collections/day"},
    {code:"dr1",full:"Women's Dresses",cat:"Core",url:"https://shopaleena.com/ar/collections/dress"},
    {code:"eid",full:"Eid Collection 2026",cat:"Seasonal",url:"https://shopaleena.com/ar/collections/eid-collection-2026"},
    {code:"eve",full:"Evening Dresses",cat:"Core",url:"https://shopaleena.com/ar/collections/evening"},
    {code:"fa1",full:"Fall Selections",cat:"General",url:"https://shopaleena.com/ar/collections/fall-selections"},
    {code:"fa2",full:"Winter & Fall Outfits",cat:"Fall-Winter",url:"https://shopaleena.com/ar/collections/fall-winter-collection"},
    {code:"fur",full:"Fur Jackets & Coats",cat:"Core",url:"https://shopaleena.com/ar/collections/furr"},
    {code:"gat",full:"Gatherings Dresses",cat:"General",url:"https://shopaleena.com/ar/collections/gatherings"},
    {code:"gif",full:"Gift For Women",cat:"General",url:"https://shopaleena.com/ar/collections/gift-set"},
    {code:"gra",full:"Graduation Dresses",cat:"Graduation",url:"https://shopaleena.com/ar/collections/graduation-dresses"},
    {code:"hai",full:"Silk Scrunchies",cat:"Home",url:"https://shopaleena.com/ar/collections/haircare"},
    {code:"hee",full:"Shoe Collection",cat:"Core",url:"https://shopaleena.com/ar/collections/heels-flats"},
    {code:"jer",full:"Jersey Dresses",cat:"General",url:"https://shopaleena.com/ar/collections/jersey-dresses"},
    {code:"kaf",full:"Kaftan Collections",cat:"General",url:"https://shopaleena.com/ar/collections/kaftan-collection"},
    {code:"ka1",full:"Women's Kaftans",cat:"Core",url:"https://shopaleena.com/ar/collections/kaftans"},
    {code:"kid",full:"Baby Girl Dresses",cat:"Special",url:"https://shopaleena.com/ar/collections/kids-collection"},
    {code:"lig",full:"Light Breeze Edit",cat:"Core",url:"https://shopaleena.com/ar/collections/light-breeze-selections"},
    {code:"lin",full:"Linen Dresses",cat:"Special",url:"https://shopaleena.com/ar/collections/linen-dresses"},
    {code:"mat",full:"Maternity Pieces",cat:"General",url:"https://shopaleena.com/ar/collections/maternity-pieces"},
    {code:"max",full:"Maxi Dresses",cat:"Core",url:"https://shopaleena.com/ar/collections/maxi-dresses"},
    {code:"mid",full:"Midi Dresses",cat:"Core",url:"https://shopaleena.com/ar/collections/midi-dresses"},
    {code:"mod",full:"Modest Wear",cat:"Core",url:"https://shopaleena.com/ar/collections/modest-collection"},
    {code:"mom",full:"Mommy & Me Outfits",cat:"General",url:"https://shopaleena.com/ar/collections/mommy-me"},
    {code:"mos",full:"Most Wanted Pieces",cat:"Core",url:"https://shopaleena.com/ar/collections/most-wanted-now"},
    {code:"new",full:"New Arrivals",cat:"Core",url:"https://shopaleena.com/ar/collections/new-arrivals"},
    {code:"ne1",full:"New Styles Added",cat:"Core",url:"https://shopaleena.com/ar/collections/new-styles-added"},
    {code:"nig",full:"Night Dresses",cat:"Core",url:"https://shopaleena.com/ar/collections/night"},
    {code:"occ",full:"Occasions Dresses",cat:"General",url:"https://shopaleena.com/ar/collections/occasion-dresses"},
    {code:"off",full:"Discounted Dresses",cat:"General",url:"https://shopaleena.com/ar/collections/60-off"},
    {code:"paj",full:"Pajamas",cat:"Core",url:"https://shopaleena.com/ar/collections/pajamas"},
    {code:"pan",full:"Pants & Trousers",cat:"General",url:"https://shopaleena.com/ar/collections/pants"},
    {code:"pil",full:"Silk Pillowcases",cat:"Home",url:"https://shopaleena.com/ar/collections/pillowcases"},
    {code:"pri",full:"Printed Dresses",cat:"Special",url:"https://shopaleena.com/ar/collections/printed-dresses"},
    {code:"ram",full:"Ramadan Collection 26",cat:"Seasonal",url:"https://shopaleena.com/ar/collections/ramadan-collection-26"},
    {code:"sal",full:"Sale All Products",cat:"General",url:"https://shopaleena.com/ar/collections/sale"},
    {code:"set",full:"Women's Sets",cat:"Core",url:"https://shopaleena.com/ar/collections/sets"},
    {code:"shi",full:"Shirts & Blouses",cat:"Core",url:"https://shopaleena.com/ar/collections/shirts"},
    {code:"sk1",full:"Women's Skirts",cat:"General",url:"https://shopaleena.com/ar/collections/skirts"},
    {code:"su2",full:"Summer Collection",cat:"Seasonal",url:"https://shopaleena.com/ar/collections/summer-collection"},
    {code:"swi",full:"Swimsuits",cat:"Core",url:"https://shopaleena.com/ar/collections/swimwear-collection"},
    {code:"top",full:"Women's Tops",cat:"General",url:"https://shopaleena.com/ar/collections/tops"},
    {code:"und",full:"Under Abaya",cat:"General",url:"https://shopaleena.com/ar/collections/under-abaya"},
    {code:"vda",full:"Travel & Airport Outfits",cat:"Valentine",url:"https://shopaleena.com/ar/collections/v-day-collection"},
    {code:"vel",full:"All Eyes On Velvet",cat:"Core",url:"https://shopaleena.com/ar/collections/velvet-elegance"},
    {code:"whi",full:"White Dresses",cat:"Special",url:"https://shopaleena.com/ar/collections/white-dresses"},
    {code:"win",full:"Winter Collection",cat:"Fall-Winter",url:"https://shopaleena.com/ar/collections/winter-collection"},
  ],
  bidding:[{code:"abo",full:"Ad Set Budget"},{code:"cbo",full:"Campaign Budget"}],
  audiences:[{code:"new",full:"New / Broad"},{code:"vc",full:"View Content"},{code:"atc",full:"Add to Cart"},{code:"ic",full:"Initiate Checkout"},{code:"pp",full:"Post Purchase"},{code:"fb",full:"FB Engagement"},{code:"ig",full:"IG Engagement"},{code:"vc-cat",full:"VC - Catalog"},{code:"atc-cat",full:"ATC - Catalog"},{code:"ic-cat",full:"IC - Catalog"},{code:"lal",full:"Lookalike"}],
  targeting:[{code:"broad",full:"Broad"},{code:"int",full:"Interest"},{code:"lal1",full:"LAL 1%"},{code:"lal3",full:"LAL 3%"},{code:"lal5",full:"LAL 5%"},{code:"7d",full:"7 Days"},{code:"14d",full:"14 Days"},{code:"30d",full:"30 Days"},{code:"60d",full:"60 Days"},{code:"90d",full:"90 Days"},{code:"180d",full:"180 Days"}],
  formats:[{code:"vid",full:"Video",plat:"All"},{code:"img",full:"Static Image",plat:"All"},{code:"caro",full:"Carousel",plat:"All"},{code:"ugc",full:"UGC Content",plat:"All"},{code:"inf",full:"Influencer Content",plat:"All"},{code:"coll",full:"Collection Ad",plat:"Meta, Snap"},{code:"slid",full:"Slideshow",plat:"Meta"},{code:"reel",full:"Reel / Short",plat:"Meta, TikTok"},{code:"spark",full:"Spark Ad",plat:"TikTok"},{code:"boost",full:"Partnership Ad",plat:"Meta"},{code:"promo",full:"Promoted Snap",plat:"Snapchat"},{code:"story",full:"Story Ad",plat:"Snapchat"},{code:"lens",full:"AR Lens",plat:"Snapchat"},{code:"filtr",full:"AR Filter",plat:"Snapchat"},{code:"comm",full:"Commercial",plat:"Snapchat"},{code:"play",full:"Playable Ad",plat:"TikTok"}],
  hooks:[{code:"off",full:"Offer / Discount",cat:"Conversion & Sales"},{code:"life",full:"Lifestyle",cat:"Storytelling & Brand"},{code:"prod",full:"Product Focus",cat:"Product & Features"},{code:"test",full:"Testimonial",cat:"Engagement & Community"},{code:"unbox",full:"Unboxing",cat:"Engagement & Community"},{code:"bts",full:"Behind the Scenes",cat:"Storytelling & Brand"},{code:"trend",full:"Trending / Viral",cat:"Platform-Specific"},{code:"ba",full:"Before & After",cat:"Emotional & Aspirational"},{code:"ugc",full:"User-Generated Content",cat:"Engagement & Community"},{code:"qa",full:"Q&A / FAQ",cat:"Educational & How-To"},{code:"poll",full:"Poll / Voting",cat:"Engagement & Community"},{code:"chal",full:"Challenge / Trend",cat:"Engagement & Community"},{code:"give",full:"Giveaway / Contest",cat:"Engagement & Community"},{code:"style",full:"Styling Tips",cat:"Educational & How-To"},{code:"care",full:"Fabric Care",cat:"Educational & How-To"},{code:"size",full:"Size Guide",cat:"Educational & How-To"},{code:"occ",full:"Occasion Guide",cat:"Educational & How-To"},{code:"fore",full:"Trend Forecast",cat:"Educational & How-To"},{code:"design",full:"Designer Story",cat:"Storytelling & Brand"},{code:"story",full:"Collection Story",cat:"Storytelling & Brand"},{code:"cust",full:"Customer Story",cat:"Storytelling & Brand"},{code:"values",full:"Brand Values",cat:"Storytelling & Brand"},{code:"cult",full:"Cultural Moment",cat:"Storytelling & Brand"},{code:"fabric",full:"Fabric Spotlight",cat:"Product & Features"},{code:"detail",full:"Detail Focus",cat:"Product & Features"},{code:"new",full:"New Arrival",cat:"Product & Features"},{code:"comp",full:"Comparison",cat:"Product & Features"},{code:"hack",full:"Hack / Tip",cat:"Educational & How-To"},{code:"conf",full:"Confidence Boost",cat:"Emotional & Aspirational"},{code:"nostal",full:"Nostalgia",cat:"Emotional & Aspirational"},{code:"lux",full:"Luxury Feel",cat:"Emotional & Aspirational"},{code:"relat",full:"Relatable Moment",cat:"Emotional & Aspirational"},{code:"insp",full:"Inspiration",cat:"Emotional & Aspirational"},{code:"limit",full:"Limited Time",cat:"Conversion & Sales"},{code:"bundle",full:"Bundle Deal",cat:"Conversion & Sales"},{code:"season",full:"Seasonal Push",cat:"Conversion & Sales"},{code:"flash",full:"Flash Sale",cat:"Conversion & Sales"},{code:"reel",full:"Reel / Short Form",cat:"Platform-Specific"},{code:"carou",full:"Carousel",cat:"Platform-Specific"},{code:"series",full:"Story Series",cat:"Platform-Specific"},{code:"live",full:"Live Session",cat:"Platform-Specific"}],
  versions:[{code:"v1",full:"V1"},{code:"v2",full:"V2"},{code:"v3",full:"V3"},{code:"v4",full:"V4"},{code:"v5",full:"V5"}],
};

const CL = {c:{bg:"#0F766E",lt:"#f0fdfa",bd:"#99f6e4",tx:"#0F766E"},a:{bg:"#8B5CF6",lt:"#f5f3ff",bd:"#c4b5fd",tx:"#7C3AED"},d:{bg:"#F97316",lt:"#fff7ed",bd:"#fed7aa",tx:"#EA580C"}};

export default function App() {
  const [tab, setTab] = useState("builder");
  const [data, setData] = useState(D);
  const [sel, setSel] = useState({platform:"",type:"",objective:"",collection:"",bidding:""});
  const [asSel, setAsSel] = useState({audience:"",detail:""});
  const [adSel, setAdSel] = useState({format:"",hook:"",version:""});
  const [baseUrl, setBaseUrl] = useState("https://shopaleena.com");
  const [hist, setHist] = useState([]);
  const [admDim, setAdmDim] = useState("platforms");
  const [admNew, setAdmNew] = useState({code:"",full:"",extra:""});
  const [cs, setCs] = useState("");
  const [hs, setHs] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortLoading, setShortLoading] = useState(false);
  const [shortError, setShortError] = useState("");

  useEffect(function(){
    try { var d = localStorage.getItem("utm-config"); if(d) setData(JSON.parse(d)); } catch(e){}
    try { var h = localStorage.getItem("utm-history"); if(h) setHist(JSON.parse(h)); } catch(e){}
  },[]);

  useEffect(function(){setShortUrl("");setShortError("")},[sel,asSel,adSel,baseUrl]);

  var save = function(k,v){ try { localStorage.setItem(k,JSON.stringify(v)); } catch(e){} };

  var plat = data.platforms.find(function(p){return p.code===sel.platform});
  var campName = [sel.platform,sel.type,sel.objective,sel.collection,sel.bidding].filter(Boolean).join("-");
  var asOwn = [asSel.audience,asSel.detail].filter(Boolean).join("-");
  var adOwn = [adSel.format,adSel.hook,adSel.version].filter(Boolean).join("-");
  var asFull = asOwn ? (campName ? asOwn+"_"+campName : asOwn) : "";
  var adFull = adOwn ? [adOwn,asOwn,campName].filter(Boolean).join("_") : "";
  var utmUrl = "";
  if (campName) {
    var p = new URLSearchParams();
    p.set("utm_source",sel.platform||"platform");
    p.set("utm_medium",plat?plat.medium:"paid-social");
    p.set("utm_campaign",campName);
    if(asOwn)p.set("utm_content",asOwn);
    if(adOwn)p.set("utm_term",adOwn);
    utmUrl = baseUrl+"?"+p.toString();
  }

  var pickColl = function(code){
    setSel(function(prev){
      var n = prev.collection===code?"":code;
      if(n){var c=data.collections.find(function(x){return x.code===n});if(c&&c.url)setBaseUrl(c.url)}
      return Object.assign({},prev,{collection:n});
    });
  };
  var pick = function(g,c){setSel(function(p){var o={};o[g]=p[g]===c?"":c;return Object.assign({},p,o)})};
  var pickAs = function(g,c){setAsSel(function(p){var o={};o[g]=p[g]===c?"":c;return Object.assign({},p,o)})};
  var pickAd = function(g,c){setAdSel(function(p){var o={};o[g]=p[g]===c?"":c;return Object.assign({},p,o)})};

  var saveH = function(sUrl){
    if(!utmUrl)return;
    var e = {url:utmUrl,campaign:campName,adset:asFull,ad:adFull,shortUrl:sUrl||shortUrl||"",ts:new Date().toLocaleString(),id:Date.now()};
    var n = [e].concat(hist).slice(0,20);
    setHist(n);save("utm-history",n);
  };

  // CHANGE THIS to your Cloudflare Worker URL after deploying
  var SHORTENER_PROXY = "https://shortener-proxy.YOUR_ACCOUNT.workers.dev";

  var shortenUrl = function(){
    if(!utmUrl)return;
    var domain = null;
    var lower = baseUrl.toLowerCase();
    if(lower.indexOf("widebot")>=0) domain = "go.widebot.ai";
    else if(lower.indexOf("hulul")>=0) domain = "go.hulul.ai";
    if(!domain){setShortError("URL must contain 'widebot' or 'hulul' to shorten");return}
    setShortLoading(true);setShortError("");setShortUrl("");
    fetch(SHORTENER_PROXY,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({originalURL:utmUrl,domain:domain})
    }).then(function(r){return r.json()}).then(function(d){
      setShortLoading(false);
      if(d.shortURL){setShortUrl(d.shortURL);saveH(d.shortURL)}
      else{setShortError(d.message||d.error||"Failed to shorten")}
    }).catch(function(e){setShortLoading(false);setShortError("Network error: "+e.message)});
  };
  var removeH = function(id){var n=hist.filter(function(h){return h.id!==id});setHist(n);save("utm-history",n)};
  var clearH = function(){setHist([]);save("utm-history",[])};
  var resetD = function(){setData(D);save("utm-config",D)};

  var fColls = cs ? data.collections.filter(function(c){return c.full.toLowerCase().indexOf(cs.toLowerCase())>=0||c.code.indexOf(cs.toLowerCase())>=0}) : data.collections;
  var fHooks = hs ? data.hooks.filter(function(h){return h.full.toLowerCase().indexOf(hs.toLowerCase())>=0||h.code.indexOf(hs.toLowerCase())>=0||(h.cat||"").toLowerCase().indexOf(hs.toLowerCase())>=0}) : data.hooks;

  var chip = function(o,selected,onClick,color,showCat){
    return <button key={o.code} onClick={onClick} style={{padding:"4px 8px",borderRadius:6,border:selected?"2px solid "+color:"1.5px solid #d1d5db",background:selected?color:"transparent",color:selected?"#fff":"#374151",fontSize:11,fontWeight:selected?600:400,cursor:"pointer",fontFamily:"'IBM Plex Sans',sans-serif",whiteSpace:"nowrap",lineHeight:1.4}}>
      <b>{o.code}</b>{" "}<span style={{opacity:0.5,fontSize:8.5}}>({o.full})</span>{o.plat&&o.plat!=="All"?<span style={{opacity:0.3,fontSize:7.5,marginLeft:1}}>[{o.plat}]</span>:null}{showCat&&o.cat?<span style={{opacity:0.3,fontSize:7.5,marginLeft:1}}>[{o.cat}]</span>:null}
    </button>;
  };

  var copyBox = function(label,value,accent,mono,onCopy){
    return <CopyBlock label={label} value={value} accent={accent||"#34d399"} mono={mono} onCopy={onCopy}/>;
  };

  var DIMS=[{key:"platforms",label:"Platforms",extra:"utm_medium"},{key:"types",label:"Campaign Type"},{key:"objectives",label:"Objectives",extra:"Platform(s)"},{key:"collections",label:"Collections",extra:"Arabic URL"},{key:"bidding",label:"Bidding"},{key:"audiences",label:"Audience Type"},{key:"targeting",label:"Targeting Detail"},{key:"formats",label:"Ad Format",extra:"Platform(s)"},{key:"hooks",label:"Ad Hook",extra:"Category"},{key:"versions",label:"Version"}];

  var REF=[
    {title:"Campaign Level",color:CL.c,groups:[{label:"Platform",items:data.platforms},{label:"Campaign Type",items:data.types},{label:"Objective",items:data.objectives},{label:"Collection",items:data.collections},{label:"Bidding",items:data.bidding}]},
    {title:"Ad Set Level",color:CL.a,groups:[{label:"Audience Type",items:data.audiences},{label:"Targeting Detail",items:data.targeting}]},
    {title:"Ad Level",color:CL.d,groups:[{label:"Ad Format",items:data.formats},{label:"Ad Hook",items:data.hooks},{label:"Version",items:data.versions}]},
  ];

  return (
    <div style={{fontFamily:"'IBM Plex Sans',sans-serif",maxWidth:880,margin:"0 auto",padding:"16px 12px",color:"#1f2937"}}>
      {/* fonts loaded in index.html */}

      {/* HEADER */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,borderBottom:"1px solid #e5e7eb",paddingBottom:10}}>
        <div>
          <h1 style={{fontSize:18,fontWeight:700,color:"#0F766E",margin:0}}>Campaign & UTM Builder</h1>
          <p style={{fontSize:10,color:"#6b7280",margin:"3px 0 0"}}>
            <span style={{color:CL.c.tx}}>Campaign</span>{" \u2192 "}<span style={{color:CL.a.tx}}>Ad Set</span>{" \u2192 "}<span style={{color:CL.d.tx}}>Ad</span>{" \u2014 separated by "}<code style={{background:"#f3f4f6",padding:"1px 4px",borderRadius:3,fontSize:9}}>_</code>{" \u2014 across All platforms"}
          </p>
        </div>
        <a href="https://essawi.com/?utm_source=saasgate.io&utm_medium=saas-tools&utm_campaign=utm-builder" target="_blank" rel="noopener noreferrer" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:9,color:"#9ca3af"}}>Built by</span>
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMyIiBoZWlnaHQ9IjM3IiB2aWV3Qm94PSIwIDAgMTMyIDM3IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfODIyM18zMzMpIj4KPHBhdGggZD0iTTEyNy45MzUgMTUuNTc2N0MxMjcuOTM1IDE1LjQ3MDYgMTI3Ljk0MyAxMy4wNjQ1IDEyNy45NDMgMTIuOTU4NEMxMjcuOTQzIDcuNTE3MTYgMTIzLjQwNyAzLjEzNjkxIDExNy45MDkgMy4zOTA3OUMxMTMuMDM2IDMuNjE0MzQgMTA5LjA2NSA3LjU0NzQ4IDEwOC44IDEyLjQyMDNDMTA4Ljc4OSAxMi42MjQ5IDEwOC43ODUgMTIuODI5NSAxMDguNzg5IDEzLjAzNDJWMTIuOTY5N0MxMDguNzg5IDE0Ljc4NDcgMTA3LjMxNSAxNi4yNTg3IDEwNS41IDE2LjI1ODdDMTAzLjY4NSAxNi4yNTg3IDEwMi4yMTEgMTQuNzg0NyAxMDIuMjExIDEyLjk2OTdWNy4yODYwM0MxMDIuMjExIDYuODg0MzggMTAxLjg4NSA2LjU1ODUxIDEwMS40ODMgNi41NTg1MUg5Ni42NDg0Qzk2LjI0NjcgNi41NTg1MSA5NS45MjQ3IDYuODg0MzggOTUuOTI0NyA3LjI4MjI0TDk1LjkxNzEgMTIuNDY5NkM5NS45MTcxIDEyLjUyMjYgOTUuOTA5NSAxMi45MjgxIDk1LjkwOTUgMTIuOTI4MUM5NS45MDk1IDE0Ljc0MzEgOTQuNDM1NSAxNi4yMTcgOTIuNjIwNSAxNi4yMTdDOTAuODAxNyAxNi4yMTcgODkuMzE2NCAxNC43MzE3IDg5LjMxNjQgMTIuOTEyOVY3LjI3ODQ1Qzg5LjMxNjQgNi44NzY4IDg4Ljk5MDUgNi41NTA5MyA4OC41ODg5IDYuNTUwOTNIODMuMzU2MUM4Mi45NTQ0IDYuNTUwOTMgODIuNjMyMyA2Ljg3NjggODIuNjMyMyA3LjI3NDY2TDgyLjYyNDggMTIuNDYyQzgyLjYyNDggMTIuNTE1IDgyLjYxNzIgMTIuOTIwNSA4Mi42MTcyIDEyLjkyMDVWMTIuOTI4MUM4Mi42MTcyIDEyLjk5NjMgODIuNjI0OCAxMy4wNjQ1IDgyLjYzOTkgMTMuMTMyN0M4Mi45MzU1IDE4LjM4ODIgODcuMjg5MiAyMi41NjAxIDkyLjYyMDUgMjIuNTYwMUM5NS4xMTc2IDIyLjU2MDEgOTcuMzk4NiAyMS42NDMxIDk5LjE0OTIgMjAuMTI3NEMxMDAuOTQ1IDIxLjcxODkgMTAzLjM0IDIyLjY0NzIgMTA1Ljk1MSAyMi41MjZDMTEwLjgyNCAyMi4zMDI0IDExNC43OTUgMTguMzY5MyAxMTUuMDYgMTMuNDk2NEMxMTUuMDcxIDEzLjI5MTggMTE1LjA3NSAxMy4wODcyIDExNS4wNzEgMTIuODgyNlYxMi45NDdDMTE1LjA3MSAxMS4xMzIgMTE2LjU0NSA5LjY1ODAzIDExOC4zNiA5LjY1ODAzQzEyMC4xNzUgOS42NTgwMyAxMjEuNjQ5IDExLjEzMiAxMjEuNjQ5IDEyLjk0N1YxNS42OTc5QzEyMS42NDkgMTYuMTE0NyAxMjEuOTg2IDE2LjQ1MiAxMjIuNDAzIDE2LjQ1MkgxMjcuMjEyQzEyNy42MTMgMTYuNDUyIDEyNy45MzUgMTYuMTI2MSAxMjcuOTM1IDE1LjcyODJMMTI3Ljk0MyAxNS43NTFDMTI3Ljk0MyAxNS42OTA0IDEyNy45MzkgMTUuNjI5NyAxMjcuOTMyIDE1LjU3MjlMMTI3LjkzNSAxNS41NzY3WiIgZmlsbD0iIzAwNERGRiIvPgo8cGF0aCBkPSJNODkuMDIxMSAzMC4xMDgxQzkwLjU3NiAzMC4xMDgxIDkxLjgzNjUgMjguODQ3NiA5MS44MzY1IDI3LjI5MjdDOTEuODM2NSAyNS43Mzc5IDkwLjU3NiAyNC40Nzc0IDg5LjAyMTEgMjQuNDc3NEM4Ny40NjYzIDI0LjQ3NzQgODYuMjA1OCAyNS43Mzc5IDg2LjIwNTggMjcuMjkyN0M4Ni4yMDU4IDI4Ljg0NzYgODcuNDY2MyAzMC4xMDgxIDg5LjAyMTEgMzAuMTA4MVoiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTk2LjMwNzUgMzAuMTA4MUM5Ny44NjI0IDMwLjEwODEgOTkuMTIyOSAyOC44NDc2IDk5LjEyMjkgMjcuMjkyN0M5OS4xMjI5IDI1LjczNzkgOTcuODYyNCAyNC40Nzc0IDk2LjMwNzUgMjQuNDc3NEM5NC43NTI3IDI0LjQ3NzQgOTMuNDkyMiAyNS43Mzc5IDkzLjQ5MjIgMjcuMjkyN0M5My40OTIyIDI4Ljg0NzYgOTQuNzUyNyAzMC4xMDgxIDk2LjMwNzUgMzAuMTA4MVoiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTcxLjU3OTIgMTIuNjcwNEM3MS41NzkyIDEyLjc3NjUgNzEuNTcxNyAxMi44Nzg4IDcxLjU3MTcgMTIuOTg0OUM3MS41NzE3IDE4LjQyNjEgNzUuNDcwNyAyMi44MDY0IDgwLjE5OTUgMjIuNTUyNUM4NC4zOTAzIDIyLjMyODkgODcuODA0NCAxOC4zOTU4IDg4LjAzMTcgMTMuNTIzQzg4LjA1ODIgMTIuOTczNSA4OC4wNDMxIDEyLjQzMTcgODcuOTkzOCAxMS45MDEyQzg3LjgwMDYgOS45MDA1NCA4Ny4wNzMgOC4wMTM1NCA4NS45ODU2IDYuNTc3NDZIODMuOTEyOUM4My4yMDgxIDYuNTc3NDYgODIuNjM2IDcuMjQ0MzUgODIuNjM2IDguMDYyOFYxMi45ODg3QzgyLjYzNiAxNC44MDM3IDgxLjM3MDQgMTYuMjc3NyA3OS44MDkzIDE2LjI3NzdDNzguMjQ4MSAxNi4yNzc3IDc2Ljk4MjYgMTQuODAzNyA3Ni45ODI2IDEyLjk4ODdWNy4zMDExOUM3Ni45ODI2IDYuODk5NTQgNzYuNzAyMiA2LjU3MzY3IDc2LjM1NzQgNi41NzM2N0g3Mi4xOTY5QzcxLjg1MjEgNi41NzM2NyA3MS41NzU0IDYuODk5NTQgNzEuNTc1NCA3LjI5NzRMNzEuNTY3OSAxMi40ODQ3QzcxLjU2NzkgMTIuNTQ1NCA3MS41NzE3IDEyLjYwNiA3MS41NzkyIDEyLjY2MjhWMTIuNjcwNFoiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTYwLjUxODkgMTIuNjcwNEM2MC41MTg5IDEyLjc3NjUgNjAuNTExNCAxMi44Nzg4IDYwLjUxMTQgMTIuOTg0OUM2MC41MTE0IDE4LjQyNjEgNjQuNDEwNCAyMi44MDY0IDY5LjEzOTIgMjIuNTUyNUM3My4zMyAyMi4zMjg5IDc2Ljc0NDEgMTguMzk1OCA3Ni45NzE0IDEzLjUyM0M3Ni45OTc5IDEyLjk3MzUgNzYuOTgyOCAxMi40MzE3IDc2LjkzMzUgMTEuOTAxMkM3Ni43NDAzIDkuOTAwNTQgNzYuMDEyNyA4LjAxMzU0IDc0LjkyNTMgNi41Nzc0Nkg3Mi44NTI2QzcyLjE0NzggNi41Nzc0NiA3MS41NzU3IDcuMjQ0MzUgNzEuNTc1NyA4LjA2MjhWMTIuOTg4N0M3MS41NzU3IDE0LjgwMzcgNzAuMzEwMSAxNi4yNzc3IDY4Ljc0OSAxNi4yNzc3QzY3LjE4NzggMTYuMjc3NyA2NS45MjIzIDE0LjgwMzcgNjUuOTIyMyAxMi45ODg3VjcuMzAxMTlDNjUuOTIyMyA2Ljg5OTU0IDY1LjY0MTkgNi41NzM2NyA2NS4yOTcgNi41NzM2N0g2MS4xMzY2QzYwLjc5MTcgNi41NzM2NyA2MC41MTUxIDYuODk5NTQgNjAuNTE1MSA3LjI5NzRMNjAuNTA3NiAxMi40ODQ3QzYwLjUwNzYgMTIuNTQ1NCA2MC41MTE0IDEyLjYwNiA2MC41MTg5IDEyLjY2MjhWMTIuNjcwNFoiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTY1Ljg3MzIgMTEuOTA1QzY1LjY3OTkgOS45MDQzMiA2NC45NTI0IDguMDE3MzIgNjMuODY0OSA2LjU4MTI0SDYxLjc5MjJDNjEuMDg3NSA2LjU4MTI0IDYwLjUxNTMgNy4yNDgxMyA2MC41MTUzIDguMDY2NThWMTIuOTkyNUM2MC41MTUzIDE0LjgwNzUgNTkuMjQ5NyAxNi4yODE0IDU3LjY4ODYgMTYuMjgxNEM1Ni45MzQ2IDE2LjI4OSA1NS45NDU2IDE2LjMwOCA1NS40MzAzIDE2LjMxMThMNTMuNjc5NyAyMi41NjM5QzU0LjYwMDQgMjIuNTYzOSA1Ny40MzQ3IDIyLjU4NjYgNTguMDc4OSAyMi41NTI1QzYyLjI2OTcgMjIuMzI4OSA2NS42ODM3IDE4LjM5NTggNjUuOTExIDEzLjUyM0M2NS45Mzc2IDEyLjk3MzUgNjUuOTIyNCAxMi40MzE3IDY1Ljg3MzIgMTEuOTAxMlYxMS45MDVaIiBmaWxsPSIjMDA0REZGIi8+CjxwYXRoIGQ9Ik0zNi4wMTQ2IDEzLjQzOTZDMzYuMDE0NiAxMy4zMzM1IDM2LjAyMjIgMTMuMjMxMiAzNi4wMjIyIDEzLjEyNTFDMzYuMDIyMiA3LjY4Mzg4IDMxLjQ4NjYgMy4zMDM2MyAyNS45ODg1IDMuNTU3NUMyMS4xMTU3IDMuNzgxMDYgMTcuMTQ0NyA3LjcxNDE5IDE2Ljg3OTQgMTIuNTg3QzE2Ljg0OTEgMTMuMTM2NSAxNi44NjQzIDEzLjY3ODMgMTYuOTI0OSAxNC4yMDg4QzE3LjE0ODQgMTYuMjA5NSAxNy45OTM0IDE4LjA5NjUgMTkuMjU5IDE5LjUzMjVIMjEuNjY4OUMyMi40OTExIDE5LjUzMjUgMjMuMTU0MiAxOC44MDEyIDIzLjE1NDIgMTcuOTc5VjEzLjEyMTNDMjMuMTU0MiAxMS4zMDYzIDI0LjYyODIgOS44MzIzMyAyNi40NDMyIDkuODMyMzNDMjguMjU4MiA5LjgzMjMzIDI5LjczMjIgMTEuMzA2MyAyOS43MzIyIDEzLjEyMTNWMTUuODA3OEMyOS43MzIyIDE2LjE3MTYgMzAuMDI3NyAxNi40NjcxIDMwLjM5MTUgMTYuNDY3MUgzNS4yOTQ3QzM1LjY5NjMgMTYuNDY3MSAzNi4wMTg0IDE2LjE0MTMgMzYuMDE4NCAxNS43NDM0TDM2LjAyNiAxMy42MjE1QzM2LjAyNiAxMy41NjA4IDM2LjAyMjIgMTMuNTAwMiAzNi4wMTQ2IDEzLjQ0MzRWMTMuNDM5NloiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTQgMTguMDMyQzQgMjMuNDczMyA4LjUzNTYxIDI3Ljg1MzUgMTQuMDMzNyAyNy41OTk2QzE4LjkwNjUgMjcuMzc2MSAyMi44NTg2IDIzLjMzNjggMjMuMTI3NiAxOC40NjRDMjMuMTU3OSAxNy45MTQ2IDIzLjE1NDEgMTYuNjE0OSAyMy4wOTM1IDE2LjA4ODJDMjIuODY5OSAxNC4wODc1IDIyLjAyODggMTMuMDYwNyAyMC43NjMyIDExLjYyODRIMTguMzUzM0MxNy41MzEgMTEuNjI4NCAxNi44Njc5IDEyLjI5NTMgMTYuODY3OSAxMy4xMTM3VjE4LjAzOTZDMTYuODY3OSAxOS44NTQ2IDE1LjM5NCAyMS4zMjg2IDEzLjU3OSAyMS4zMjg2QzExLjc2NCAyMS4zMjg2IDEwLjI5IDE5Ljg1NDYgMTAuMjkgMTguMDM5NlYxNy4zNTM4QzEwLjI5IDE2Ljk1OTcgOS45Njc5IDE2LjYzNzYgOS41NzM4MyAxNi42Mzc2SDQuNzI3NTJDNC4zMjU4NyAxNi42Mzc2IDQuMDAzNzkgMTYuOTYzNSA0LjAwMzc5IDE3LjM2MTRDNC4wMDM3OSAxNy4zNjE0IDQuMDAzNzkgMTcuOTI5NyA0LjAwMzc5IDE4LjAzMkg0WiIgZmlsbD0iIzAwNERGRiIvPgo8cGF0aCBkPSJNNC4zNjc1NSAxNi42MzM5SDkuOTMzOEMxMC4xMjcgMTYuNjMzOSAxMC4yODYyIDE2Ljc5MyAxMC4yODYyIDE2Ljk4NjJWMTguOTc5M0MxMC4yODYyIDE4Ljk3OTMgMTAuMjc4NiAxOC45OTgzIDEwLjI2NzIgMTguOTk4M0g1LjcyNDA2QzQuNzcyOTkgMTguOTk4MyA0IDE4LjIyNTMgNCAxNy4yNzQyVjE3LjAwNTJDNCAxNi44MDA2IDQuMTY2NzIgMTYuNjM3NiA0LjM2NzU1IDE2LjYzNzZWMTYuNjMzOVoiIGZpbGw9IiMwMDRERkYiLz4KPHBhdGggZD0iTTcuMTQxMjYgNy4xMzA2N0M4LjY5NjEzIDcuMTMwNjcgOS45NTY2IDUuODcwMiA5Ljk1NjYgNC4zMTUzM0M5Ljk1NjYgMi43NjA0NyA4LjY5NjEzIDEuNSA3LjE0MTI2IDEuNUM1LjU4NjQgMS41IDQuMzI1OTMgMi43NjA0NyA0LjMyNTkzIDQuMzE1MzNDNC4zMjU5MyA1Ljg3MDIgNS41ODY0IDcuMTMwNjcgNy4xNDEyNiA3LjEzMDY3WiIgZmlsbD0iIzAwNERGRiIvPgo8cGF0aCBkPSJNNy4xNDEwMiAxNC40MjFDOC42OTU4OCAxNC40MjEgOS45NTYzNSAxMy4xNjA1IDkuOTU2MzUgMTEuNjA1NkM5Ljk1NjM1IDEwLjA1MDggOC42OTU4OCA4Ljc5MDMxIDcuMTQxMDIgOC43OTAzMUM1LjU4NjE1IDguNzkwMzEgNC4zMjU2OCAxMC4wNTA4IDQuMzI1NjggMTEuNjA1NkM0LjMyNTY4IDEzLjE2MDUgNS41ODYxNSAxNC40MjEgNy4xNDEwMiAxNC40MjFaIiBmaWxsPSIjMDA0REZGIi8+CjxwYXRoIGQ9Ik01Ni45MTE2IDEyLjEzMjNDNTYuOTExNiA3LjI1MTkyIDUyLjk1NTcgMy4yOTYwNSA0OC4wNzUzIDMuMjk2MDVDNDMuMTk0OSAzLjI5NjA1IDM5LjIzOSA3LjI1MTkyIDM5LjIzOSAxMi4xMzIzQzM5LjIzOSAxNi42MzM4IDQyLjYwMzggMjAuMzQzNCA0Ni45NTc1IDIwLjg5MjhMNDIuMzUzNyAzMi4yNDg5QzQyLjA4ODUgMzIuOTAwNiA0Mi40MDI5IDMzLjYzOTUgNDMuMDU0NyAzMy45MDQ4TDQ2LjczMzkgMzUuMzk3N0M0Ny40MTYgMzUuNjc0MyA0OC4xOTI4IDM1LjM0NDYgNDguNDY5NCAzNC42NjI2TDU2LjExMjEgMTUuODExNkM1Ni42Mjc0IDE0LjY5IDU2LjkxNTQgMTMuNDQ3MiA1Ni45MTU0IDEyLjEzMjNINTYuOTExNlpNNDguMDc1MyAxNS44MTE2QzQ2LjA4MjIgMTUuODExNiA0NC40NjggMTQuMTk3NCA0NC40NjggMTIuMjA0M0M0NC40NjggMTAuMjExMiA0Ni4wODIyIDguNTk3MDYgNDguMDc1MyA4LjU5NzA2QzUwLjA2ODQgOC41OTcwNiA1MS42ODI2IDEwLjIxMTIgNTEuNjgyNiAxMi4yMDQzQzUxLjY4MjYgMTQuMTk3NCA1MC4wNjg0IDE1LjgxMTYgNDguMDc1MyAxNS44MTE2WiIgZmlsbD0iIzAwNERGRiIvPgo8cGF0aCBkPSJNNTYuMjAzMyAxNS43NDcySDUyLjI4MTVWMjIuNTYzOUg1Ni4yMDMzVjE1Ljc0NzJaIiBmaWxsPSIjMDA0REZGIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfODIyM18zMzMiPgo8cmVjdCB3aWR0aD0iMTIzLjk0NyIgaGVpZ2h0PSIzNCIgZmlsbD0id2hpdGUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQgMS41KSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo=" alt="Essawi" style={{height:28,display:"block"}}/>
        </a>
      </div>

      {/* TABS */}
      <div style={{display:"flex",gap:2,marginBottom:14,borderBottom:"1px solid #e5e7eb",flexWrap:"wrap"}}>
        {[["builder","Builder"],["history","History"],["reference","Code Reference"],["howto","How It Works"],["admin","Admin Panel"]].map(function(t){
          return <button key={t[0]} onClick={function(){setTab(t[0])}} style={{padding:"6px 12px",borderRadius:"7px 7px 0 0",border:"none",borderBottom:tab===t[0]?"3px solid #0F766E":"3px solid transparent",background:tab===t[0]?"#f0fdfa":"transparent",color:tab===t[0]?"#0F766E":"#6b7280",fontSize:11,fontWeight:tab===t[0]?700:500,cursor:"pointer",fontFamily:"'IBM Plex Sans',sans-serif"}}>
            {t[1]}{t[0]==="history"&&hist.length>0?<span style={{marginLeft:4,background:"#ef4444",color:"#fff",borderRadius:10,padding:"1px 5px",fontSize:9}}>{hist.length}</span>:null}
          </button>;
        })}
      </div>

      {/* BUILDER */}
      {tab==="builder" && <div>
        {/* Campaign */}
        <div style={{background:"#f9fafb",borderRadius:11,padding:12,marginBottom:10,border:"1px solid #e5e7eb",borderLeft:"4px solid "+CL.c.bg}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:12,fontWeight:700}}>Campaign Level <span style={{fontSize:8.5,color:"#9ca3af",fontFamily:"'IBM Plex Mono',monospace"}}>platform-type-obj-col-bid</span></span>
            {campName && <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9.5,color:CL.c.tx,fontWeight:600,background:CL.c.lt,padding:"2px 7px",borderRadius:4,border:"1px solid "+CL.c.bd}}>{campName}</span>}
          </div>
          <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Platform <span style={{fontSize:9,color:"#9ca3af"}}>segment 1st</span></div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.platforms.map(function(o){return chip(o,sel.platform===o.code,function(){pick("platform",o.code)},CL.c.bg)})}</div></div>
          <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Campaign Type <span style={{fontSize:9,color:"#9ca3af"}}>segment 2nd</span></div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.types.map(function(o){return chip(o,sel.type===o.code,function(){pick("type",o.code)},CL.c.bg)})}</div></div>
          <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Objective <span style={{fontSize:9,color:"#9ca3af"}}>segment 3rd</span></div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.objectives.map(function(o){return chip(o,sel.objective===o.code,function(){pick("objective",o.code)},CL.c.bg)})}</div></div>
          <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Collection <span style={{fontSize:9,color:"#9ca3af"}}>segment 4th</span></div>
            <input placeholder="Search collections..." value={cs} onChange={function(e){setCs(e.target.value)}} style={{width:"100%",padding:"5px 9px",borderRadius:6,border:"1px solid #d1d5db",fontSize:11,marginBottom:5,boxSizing:"border-box",outline:"none"}}/>
            <div style={{display:"flex",gap:4,flexWrap:"wrap",maxHeight:180,overflowY:"auto"}}>{fColls.map(function(o){return chip(o,sel.collection===o.code,function(){pickColl(o.code)},CL.c.bg)})}</div>
          </div>
          <div><div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Bidding <span style={{fontSize:9,color:"#9ca3af"}}>segment 5th</span></div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.bidding.map(function(o){return chip(o,sel.bidding===o.code,function(){pick("bidding",o.code)},CL.c.bg)})}</div></div>
        </div>

        {/* Ad Set */}
        <div style={{background:"#f9fafb",borderRadius:11,padding:12,marginBottom:10,border:"1px solid #e5e7eb",borderLeft:"4px solid "+CL.a.bg}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:12,fontWeight:700}}>Ad Set Level <span style={{fontSize:8.5,color:"#9ca3af",fontFamily:"'IBM Plex Mono',monospace"}}>audience-targeting _ campaign</span></span>
            {asFull && <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9.5,color:CL.a.tx,fontWeight:600,background:CL.a.lt,padding:"2px 7px",borderRadius:4,border:"1px solid "+CL.a.bd,maxWidth:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{asFull}</span>}
          </div>
          <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Audience Type</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.audiences.map(function(o){return chip(o,asSel.audience===o.code,function(){pickAs("audience",o.code)},CL.a.bg)})}</div></div>
          <div><div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Targeting Detail</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.targeting.map(function(o){return chip(o,asSel.detail===o.code,function(){pickAs("detail",o.code)},CL.a.bg)})}</div></div>
        </div>

        {/* Ad */}
        <div style={{background:"#f9fafb",borderRadius:11,padding:12,marginBottom:10,border:"1px solid #e5e7eb",borderLeft:"4px solid "+CL.d.bg}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:12,fontWeight:700}}>Ad Level <span style={{fontSize:8.5,color:"#9ca3af",fontFamily:"'IBM Plex Mono',monospace"}}>format-hook-ver _ adset _ campaign</span></span>
            {adFull && <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9.5,color:CL.d.tx,fontWeight:600,background:CL.d.lt,padding:"2px 7px",borderRadius:4,border:"1px solid "+CL.d.bd,maxWidth:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{adFull}</span>}
          </div>
          <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Ad Format</div><div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{data.formats.map(function(o){return chip(o,adSel.format===o.code,function(){pickAd("format",o.code)},CL.d.bg)})}</div></div>
          <div style={{marginBottom:8}}><div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Hook / Angle</div>
            <input placeholder="Search hooks..." value={hs} onChange={function(e){setHs(e.target.value)}} style={{width:"100%",padding:"5px 9px",borderRadius:6,border:"1px solid #d1d5db",fontSize:11,marginBottom:5,boxSizing:"border-box",outline:"none"}}/>
            <div style={{display:"flex",gap:4,flexWrap:"wrap",maxHeight:160,overflowY:"auto"}}>{fHooks.map(function(o){return chip(o,adSel.hook===o.code,function(){pickAd("hook",o.code)},CL.d.bg,true)})}</div>
          </div>
          <div><div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Version</div><div style={{display:"flex",gap:4}}>{data.versions.map(function(o){return <button key={o.code} onClick={function(){pickAd("version",o.code)}} style={{padding:"4px 8px",borderRadius:6,border:adSel.version===o.code?"2px solid "+CL.d.bg:"1.5px solid #d1d5db",background:adSel.version===o.code?CL.d.bg:"transparent",color:adSel.version===o.code?"#fff":"#374151",fontSize:11,fontWeight:600,cursor:"pointer"}}>{o.code}</button>})}</div></div>
        </div>

        {/* URL */}
        <div style={{marginBottom:10}}>
          <div style={{fontSize:10,fontWeight:600,color:"#0F766E",textTransform:"uppercase",marginBottom:3}}>Landing URL {sel.collection&&<span style={{color:"#0F766E",fontSize:9,fontWeight:400}}>{"\u2190"} auto-filled from collection</span>}</div>
          <input type="text" value={baseUrl} onChange={function(e){setBaseUrl(e.target.value)}} style={{width:"100%",padding:"6px 10px",borderRadius:7,border:"1.5px solid #d1d5db",fontSize:11,fontFamily:"'IBM Plex Mono',monospace",boxSizing:"border-box",outline:"none"}}/>
        </div>

        {/* Output */}
        {campName && <div style={{background:"#f8fafc",borderRadius:11,padding:13,border:"1px solid #e2e8f0"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#111827",marginBottom:8}}>Generated Output</div>
          <CopyBlock label="Campaign Name" value={campName} accent="#34d399"/>
          {asFull && <CopyBlock label="Ad Set Name" value={asFull} accent="#a78bfa"/>}
          {adFull && <CopyBlock label="Ad Name" value={adFull} accent="#fb923c"/>}
          <CopyBlock label="Full UTM URL" value={utmUrl} accent="#34d399" mono={true} onCopy={function(){saveH()}}/>
          <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
            <button onClick={shortenUrl} disabled={shortLoading} style={{padding:"6px 16px",borderRadius:6,border:"none",background:shortLoading?"#9ca3af":"#3B82F6",color:"#fff",fontSize:11,fontWeight:600,cursor:shortLoading?"wait":"pointer",display:"flex",alignItems:"center",gap:4}}>
              {shortLoading?"Shortening...":"Shorten URL"}
            </button>
            {shortError&&<span style={{fontSize:10,color:"#ef4444"}}>{shortError}</span>}
          </div>
          {shortUrl&&<CopyBlock label={"Short URL ("+((baseUrl.toLowerCase().indexOf("widebot")>=0)?"go.widebot.ai":"go.hulul.ai")+")"} value={shortUrl} accent="#3B82F6" mono={true}/>}
          <div style={{marginTop:6,padding:"8px 10px",background:"#fff",borderRadius:7,border:"1px solid #e5e7eb"}}>
            <div style={{fontSize:9,fontWeight:600,color:"#6b7280",marginBottom:4,textTransform:"uppercase"}}>UTM Breakdown</div>
            <div style={{fontSize:10.5,fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.9,color:"#374151"}}>
              <div><span style={{color:"#6b7280",display:"inline-block",width:105}}>utm_source:</span><span style={{color:CL.c.tx,fontWeight:600}}>{sel.platform||"\u2014"}</span></div>
              <div><span style={{color:"#6b7280",display:"inline-block",width:105}}>utm_medium:</span><span style={{color:CL.c.tx,fontWeight:600}}>{plat?plat.medium:"\u2014"}</span></div>
              <div><span style={{color:"#6b7280",display:"inline-block",width:105}}>utm_campaign:</span><span style={{color:CL.c.tx,fontWeight:600}}>{campName}</span></div>
              <div><span style={{color:"#6b7280",display:"inline-block",width:105}}>utm_content:</span><span style={{color:CL.a.tx,fontWeight:600}}>{asOwn||"\u2014"}</span></div>
              <div><span style={{color:"#6b7280",display:"inline-block",width:105}}>utm_term:</span><span style={{color:CL.d.tx,fontWeight:600}}>{adOwn||"\u2014"}</span></div>
            </div>
          </div>
        </div>}
      </div>}

      {/* HISTORY */}
      {tab==="history" && <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:13,fontWeight:700}}>History <span style={{fontSize:11,color:"#9ca3af",fontWeight:400}}>{hist.length} saved</span></span>
          {hist.length>0 && <button onClick={clearH} style={{padding:"4px 12px",borderRadius:6,border:"1px solid #fca5a5",background:"#fff",color:"#ef4444",fontSize:10,cursor:"pointer"}}>Clear all</button>}
        </div>
        {hist.length===0 && <p style={{color:"#9ca3af",fontSize:12,textAlign:"center",padding:30}}>No history yet. Copy a Full UTM URL to auto-save here.</p>}
        {hist.map(function(h){return <div key={h.id} style={{background:"#f9fafb",borderRadius:9,padding:10,marginBottom:8,border:"1px solid #e5e7eb"}}>
          <MiniBlock label="Campaign Name" value={h.campaign} accent="#34d399"/>
          {h.adset && <MiniBlock label="Ad Set Name" value={h.adset} accent="#a78bfa"/>}
          {h.ad && <MiniBlock label="Ad Name" value={h.ad} accent="#fb923c"/>}
          <MiniBlock label="Full UTM URL" value={h.url} accent="#34d399"/>
          {h.shortUrl && <MiniBlock label="Short URL" value={h.shortUrl} accent="#3B82F6"/>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
            <span style={{fontSize:8.5,color:"#9ca3af"}}>{h.ts}</span>
            <button onClick={function(){removeH(h.id)}} style={{padding:"2px 10px",borderRadius:4,border:"1px solid #fca5a5",background:"#fff",color:"#ef4444",fontSize:9,cursor:"pointer"}}>Remove</button>
          </div>
        </div>})}
      </div>}

      {/* CODE REFERENCE */}
      {tab==="reference" && <div>
        <div style={{fontSize:11,color:"#6b7280",marginBottom:12}}>
          {"All codes. Campaign: "}<code style={{background:CL.c.lt,padding:"2px 5px",borderRadius:3,fontSize:10,color:CL.c.tx}}>platform-type-obj-col-bid</code>
          {" Ad Set: "}<code style={{background:CL.a.lt,padding:"2px 5px",borderRadius:3,fontSize:10,color:CL.a.tx}}>audience-targeting</code>
          {" Ad: "}<code style={{background:CL.d.lt,padding:"2px 5px",borderRadius:3,fontSize:10,color:CL.d.tx}}>format-hook-ver</code>
        </div>
        {REF.map(function(s){return <div key={s.title} style={{marginBottom:18}}>
          <h3 style={{fontSize:13,fontWeight:700,color:s.color.tx,marginBottom:8,borderLeft:"4px solid "+s.color.bg,paddingLeft:10}}>{s.title}</h3>
          {s.groups.map(function(g){return <div key={g.label} style={{marginBottom:12}}>
            <div style={{fontSize:10.5,fontWeight:600,color:"#374151",marginBottom:4}}>{g.label}</div>
            <div style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:"2px 12px",fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}>
              {g.items.map(function(i){return <div key={i.code} style={{display:"contents"}}>
                <span style={{fontWeight:600,color:s.color.tx}}>{i.code}</span>
                <span style={{color:"#6b7280"}}>{i.full}{i.plat&&i.plat!=="All"?" ["+i.plat+"]":""}</span>
              </div>})}
            </div>
          </div>})}
        </div>})}
      </div>}

      {/* HOW IT WORKS */}
      {tab==="howto" && <div style={{fontSize:12,lineHeight:1.8,color:"#374151"}}>
        <h2 style={{fontSize:16,fontWeight:700,color:"#0F766E",marginBottom:12}}>How This System Works with Looker Studio</h2>

        <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
          <h3 style={{fontSize:13,fontWeight:700,color:"#111827",marginBottom:6}}>What is Looker Studio?</h3>
          <p style={{margin:"0 0 8px"}}>Looker Studio (formerly Google Data Studio) is a free tool from Google that lets you build visual dashboards. Connect it to GA4, and create charts, tables, and filters to analyze ad performance.</p>
        </div>

        <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
          <h3 style={{fontSize:13,fontWeight:700,color:"#111827",marginBottom:6}}>The Magic: Splitting Names into Dimensions</h3>
          <p style={{margin:"0 0 8px"}}>{"Because your campaign name is structured as platform-type-obj-col-bid, Looker Studio can SPLIT it by \"-\" to create separate filterable columns."}</p>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10.5,lineHeight:2,marginLeft:8}}>
            {[["Platform","1"],["Campaign Type","2"],["Objective","3"],["Collection","4"],["Bidding","5"]].map(function(x){return <div key={x[0]}><span style={{color:"#6b7280"}}>{"SPLIT(Campaign, \"-\", "+x[1]+")"}</span>{" \u2192 "}<b style={{color:CL.c.tx}}>{x[0]}</b></div>})}
          </div>
        </div>

        <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
          <h3 style={{fontSize:13,fontWeight:700,color:"#111827",marginBottom:6}}>Calculated Fields for Looker Studio</h3>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,background:"#111827",color:"#34d399",padding:10,borderRadius:7,lineHeight:2}}>
            {[["Platform",'SPLIT(sessionCampaignName, "-", 1)'],["Campaign Type",'SPLIT(sessionCampaignName, "-", 2)'],["Objective",'SPLIT(sessionCampaignName, "-", 3)'],["Collection",'SPLIT(sessionCampaignName, "-", 4)'],["Bidding",'SPLIT(sessionCampaignName, "-", 5)'],["Audience Type",'SPLIT(sessionManualAdContent, "-", 1)'],["Targeting",'SPLIT(sessionManualAdContent, "-", 2)'],["Ad Format",'SPLIT(sessionManualTerm, "-", 1)'],["Ad Hook",'SPLIT(sessionManualTerm, "-", 2)']].map(function(x){return <div key={x[0]}><span style={{color:"#6b7280"}}>{x[0]+":"}</span>{" "+x[1]}</div>})}
          </div>
        </div>

        <div style={{background:"#f9fafb",borderRadius:10,padding:14,border:"1px solid #e5e7eb",marginBottom:14}}>
          <h3 style={{fontSize:13,fontWeight:700,color:"#111827",marginBottom:6}}>Label Mapping (CASE formula)</h3>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,background:"#111827",color:"#34d399",padding:12,borderRadius:8,lineHeight:1.8,maxHeight:300,overflowY:"auto"}}>
            <div style={{color:"#6b7280"}}>-- Campaign Type Label --</div>
            <div>CASE</div>
            {data.types.map(function(t){return <div key={t.code}>{"  WHEN SPLIT(Campaign,\"-\",2) = \""+t.code+"\" THEN \""+t.full+"\""}</div>})}
            <div>{"  ELSE SPLIT(Campaign,\"-\",2)"}</div><div>END</div>
            <br/><div style={{color:"#6b7280"}}>-- Objective Label --</div><div>CASE</div>
            {data.objectives.map(function(o){return <div key={o.code}>{"  WHEN SPLIT(Campaign,\"-\",3) = \""+o.code+"\" THEN \""+o.full+"\""}</div>})}
            <div>{"  ELSE SPLIT(Campaign,\"-\",3)"}</div><div>END</div>
            <br/><div style={{color:"#6b7280"}}>-- Ad Format Label --</div><div>CASE</div>
            {data.formats.map(function(f){return <div key={f.code}>{"  WHEN SPLIT(Keyword,\"-\",1) = \""+f.code+"\" THEN \""+f.full+"\""}</div>})}
            <div>{"  ELSE SPLIT(Keyword,\"-\",1)"}</div><div>END</div>
          </div>
        </div>

        <div style={{background:"#f0fdfa",borderRadius:10,padding:14,border:"1px solid #99f6e4",marginBottom:14}}>
          <h3 style={{fontSize:13,fontWeight:700,color:"#0F766E",marginBottom:6}}>Shopify UTM Tracking Notes</h3>
          <p style={{margin:"0 0 10px",fontSize:11.5}}>{"Shopify captures UTM parameters automatically in the order data. In Shopify admin \u2192 Analytics \u2192 Reports, you can find orders attributed to specific campaigns using these fields:"}</p>
          <div style={{fontSize:11.5,lineHeight:2.2}}>
            <div><b style={{color:CL.c.tx}}>utm_source</b>{" \u2192 maps to \"Referrer source\" in Shopify"}</div>
            <div><b style={{color:CL.c.tx}}>utm_medium</b>{" \u2192 maps to \"Referrer medium\""}</div>
            <div><b style={{color:CL.c.tx}}>utm_campaign</b>{" \u2192 maps to \"Referrer campaign\" (this is your campaign name)"}</div>
            <div><b style={{color:CL.a.tx}}>utm_content</b>{" \u2192 maps to \"Referrer content\" (this is your ad set name)"}</div>
            <div><b style={{color:CL.d.tx}}>utm_term</b>{" \u2192 not captured natively by Shopify (use GA4 for ad-level tracking)"}</div>
          </div>
          <p style={{margin:"10px 0 0",fontSize:11,color:"#6b7280"}}>{"These flow into GA4 as: sessionSource, sessionMedium, sessionCampaignName, sessionManualAdContent, sessionManualTerm"}</p>
        </div>

        <div style={{background:"#f0fdfa",borderRadius:10,padding:14,border:"1px solid #99f6e4"}}>
          <h3 style={{fontSize:13,fontWeight:700,color:"#0F766E",marginBottom:6}}>GA4 / Shopify / Looker Mapping</h3>
          <div style={{display:"grid",gridTemplateColumns:"100px 150px 180px",gap:"3px 10px",fontFamily:"'IBM Plex Mono',monospace",fontSize:10}}>
            <span style={{fontWeight:700}}>UTM</span><span style={{fontWeight:700}}>Shopify</span><span style={{fontWeight:700}}>GA4 Dimension</span>
            <span style={{color:CL.c.tx}}>utm_source</span><span>Referrer source</span><span>sessionSource</span>
            <span style={{color:CL.c.tx}}>utm_medium</span><span>Referrer medium</span><span>sessionMedium</span>
            <span style={{color:CL.c.tx}}>utm_campaign</span><span>Referrer campaign</span><span>sessionCampaignName</span>
            <span style={{color:CL.a.tx}}>utm_content</span><span>Referrer content</span><span>sessionManualAdContent</span>
            <span style={{color:CL.d.tx}}>utm_term</span><span>{"\u2014"}</span><span>sessionManualTerm</span>
          </div>
        </div>
      </div>}

      {/* ADMIN */}
      {tab==="admin" && <div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:14,fontWeight:700}}>Admin Panel</span>
          <button onClick={resetD} style={{padding:"4px 12px",borderRadius:6,border:"1px solid #fca5a5",background:"#fff",color:"#ef4444",fontSize:10,cursor:"pointer"}}>Reset to defaults</button>
        </div>
        <p style={{fontSize:11,color:"#6b7280",marginBottom:12}}>Edit any dimension. Changes persist across sessions.</p>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
          {DIMS.map(function(d){return <button key={d.key} onClick={function(){setAdmDim(d.key)}} style={{padding:"4px 10px",borderRadius:5,fontSize:10,cursor:"pointer",border:admDim===d.key?"2px solid #0F766E":"1px solid #d1d5db",background:admDim===d.key?"#f0fdfa":"#fff",color:admDim===d.key?"#0F766E":"#6b7280",fontWeight:admDim===d.key?600:400}}>{d.label} ({data[d.key].length})</button>})}
        </div>
        <div style={{background:"#f9fafb",borderRadius:10,padding:12,border:"1px solid #e5e7eb",marginBottom:12}}>
          <div style={{fontSize:11,fontWeight:600,marginBottom:8}}>{"Add new "+(DIMS.find(function(d){return d.key===admDim})||{}).label}</div>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            <input placeholder="Code" value={admNew.code} onChange={function(e){setAdmNew(function(p){return{code:e.target.value,full:p.full,extra:p.extra}})}} style={{padding:"5px 8px",borderRadius:5,border:"1px solid #d1d5db",fontSize:11,width:80}}/>
            <input placeholder="Full Name" value={admNew.full} onChange={function(e){setAdmNew(function(p){return{code:p.code,full:e.target.value,extra:p.extra}})}} style={{padding:"5px 8px",borderRadius:5,border:"1px solid #d1d5db",fontSize:11,width:160}}/>
            {(DIMS.find(function(d){return d.key===admDim})||{}).extra && <input placeholder={(DIMS.find(function(d){return d.key===admDim})||{}).extra} value={admNew.extra} onChange={function(e){setAdmNew(function(p){return{code:p.code,full:p.full,extra:e.target.value}})}} style={{padding:"5px 8px",borderRadius:5,border:"1px solid #d1d5db",fontSize:11,flex:1,minWidth:120}}/>}
            <button onClick={function(){
              if(!admNew.code||!admNew.full)return;
              var i={code:admNew.code.toLowerCase().trim(),full:admNew.full.trim()};
              if(admDim==="platforms")i.medium=admNew.extra||"paid-social";
              if(admDim==="objectives"||admDim==="formats")i.plat=admNew.extra||"All";
              if(admDim==="collections"){i.url=admNew.extra||"";i.cat="General"}
              if(admDim==="hooks")i.cat=admNew.extra||"General";
              var nd=Object.assign({},data);nd[admDim]=data[admDim].concat([i]);setData(nd);save("utm-config",nd);
              setAdmNew({code:"",full:"",extra:""});
            }} style={{padding:"5px 14px",borderRadius:5,border:"none",background:"#0F766E",color:"#fff",fontSize:11,cursor:"pointer"}}>Add</button>
          </div>
        </div>
        <div style={{background:"#fff",borderRadius:10,border:"1px solid #e5e7eb",maxHeight:400,overflowY:"auto"}}>
          {data[admDim].map(function(item,i){return <div key={item.code+"_"+i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 12px",borderBottom:"1px solid #f3f4f6"}}>
            <div><span style={{fontFamily:"'IBM Plex Mono',monospace",fontWeight:600,color:"#0F766E",fontSize:11,marginRight:8}}>{item.code}</span><span style={{fontSize:11,color:"#374151"}}>{item.full}</span>{(item.plat||item.cat||item.medium)?<span style={{fontSize:9,color:"#9ca3af",marginLeft:6}}>{item.plat||item.cat||item.medium}</span>:null}</div>
            <button onClick={function(){var nd=Object.assign({},data);nd[admDim]=data[admDim].filter(function(x){return x.code!==item.code});setData(nd);save("utm-config",nd)}} style={{padding:"2px 8px",borderRadius:4,border:"1px solid #fca5a5",background:"#fff",color:"#ef4444",fontSize:9,cursor:"pointer"}}>Remove</button>
          </div>})}
        </div>
      </div>}

    </div>
  );
}

function CopyBlock(props) {
  var label = props.label, value = props.value, accent = props.accent || "#34d399", mono = props.mono, onCopy = props.onCopy;
  var ref = useState(false), cp = ref[0], setCp = ref[1];
  var copy = function(){navigator.clipboard.writeText(value);setCp(true);setTimeout(function(){setCp(false)},1200);if(onCopy)onCopy()};
  return <div style={{marginBottom:8}}>
    <div style={{fontSize:9,fontWeight:600,color:"#6b7280",marginBottom:2,textTransform:"uppercase"}}>{label}</div>
    <div onClick={copy} style={{background:"#111827",color:accent,padding:"7px 11px",borderRadius:7,fontFamily:mono?"'IBM Plex Mono',monospace":"'IBM Plex Sans',sans-serif",fontSize:mono?10:11.5,cursor:"pointer",position:"relative",wordBreak:"break-all",lineHeight:1.5,border:"1px solid #1f2937"}}>
      {value}<span style={{position:"absolute",right:8,top:7,fontSize:8.5,color:cp?accent:"#6b7280"}}>{cp?"Copied!":"Click to copy"}</span>
    </div>
  </div>;
}

function MiniBlock(props) {
  var label = props.label, value = props.value, accent = props.accent || "#34d399";
  var ref = useState(false), cp = ref[0], setCp = ref[1];
  var copy = function(){navigator.clipboard.writeText(value);setCp(true);setTimeout(function(){setCp(false)},1200)};
  return <div style={{marginBottom:5}}>
    <div style={{fontSize:8,fontWeight:600,color:"#6b7280",textTransform:"uppercase"}}>{label}</div>
    <div onClick={copy} style={{background:"#111827",color:accent,padding:"5px 8px",borderRadius:5,fontFamily:"'IBM Plex Mono',monospace",fontSize:9,cursor:"pointer",position:"relative",wordBreak:"break-all",lineHeight:1.4,border:"1px solid #1f2937"}}>
      {value}<span style={{position:"absolute",right:6,top:5,fontSize:7.5,color:cp?accent:"#6b7280"}}>{cp?"Copied!":"Copy"}</span>
    </div>
  </div>;
}
