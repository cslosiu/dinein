// Initialize Firestore through Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import { collection, getDocs, getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

// config
const fireconfig = {
	apiKey: 'AIzaSyAk-E1Asdy3cKqYvKGQJq2BapaYuZ1sZnk',
	authDomain: '',
	projectId: 'okra-menu'
};

const appconfig = {
	shopId: "8LMDUiQYUvVGZxfaK1eQ",
	locale: "zh",
	currency: "HKD"
}
//=============================================================

// TODO: expand this translation list.
const translations = {
	'Ordering': '正在下單',
};

function _(obj,field="") 
{
	if (field=="")
	{
		const t = translations[obj];
		return t === undefined ? obj : t;
	}
	else 
	{
		const fieldname = `${field}_${appconfig.locale}`;
		return obj[fieldname];
	}
}

function ccy(num = 0) 
{
	return num.toLocaleString('en-US', { style: 'currency', currency: appconfig.currency });
}

function anchor(href,text) 
{
	return `<a class="btn btn-light" href="${href}">${text}</a>`;
}

function cateitem(text)
{
	return `<li class="list-group-item">${text}</li>`;
}

function buyitem(id)
{
	console.log(`buying ${id}`);
}

function itemdetail(item)
{
	const name = _(item.data(),"name");
	const price = ccy(item.data().price);
	const btn = `<button class="btn btn-primary" onclick="buyitem('${item.id}')"  data-bs-toggle="modal" data-bs-target="#addoption">+</button>`;
	return `<li class="list-group-item">
		<div class="container">
			<div class="row justify-content-md-center">
				<div class="col col-md-auto">${name}</div>
				<div class="col col-md-auto text-end">${price}</div>\
				<div class="col col-md-auto text-end">${btn}</div>
			</div>
		</div>
	</li>`;
}

function settotalamount(amt)
{
	$("#totalamount").val(ccy(amt));
}

function itemgroup(category)
{
	return `<div class="card mb-3">
	  <div class="card-header">
		${category}
	  </div>
	  <ul class="list-group list-group-flush">
	  </ul>
	</div>`;
}

//=============================================================

settotalamount(0);
const cart = new FoodCart();

const firebaseApp = initializeApp(fireconfig);

const db = getFirestore();
const querySnapshot = await getDocs(collection(db, `menu/${appconfig.shopId}/category/`));
const cateul = $('#cateul');
var catarray = [];

// populate category names
querySnapshot.forEach((doc) => {
	const n = _(doc.data(), "name");
	const item = $(cateitem(n));
	cateul.append(item);
	catarray.push(doc);
	//const k = doc.id;
});


// populate all items under each category
catarray.forEach((cat) => {
	const catname = _(cat.data(), "name");
	const itemgroupnode = $(itemgroup(catname));
	const ul = itemgroupnode.find("ul");
	getDocs(collection(cat.ref, `item`))
		.then(snapshot => {
			snapshot.forEach((item) => {
				const itemnode = $(itemdetail(item));
				ul.append(itemnode);
			});
		})
		.catch(error => {
		  console.error('Error getting documents: ', error);
		  //throw error; // Re-throw error for further handling if needed
		});
	
	$('#itemlist').append(itemgroupnode);
});
