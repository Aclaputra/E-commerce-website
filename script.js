const txtElement = ['Fungsi casing yang pertama adalah melindungi hp dari benturan dan gesekan benda-benda yang berbahaya bagi handphone.', 
'Casing dibuat dengan bahan-bahan seperti plastik, karet dan polycarbonate', 'guna bisa melindungi handphone dari gesekan dan benturan.'];
let count = 0;
let txtIndex = 0;
let currentTxt = '';
let words = '';

class Shop{
	constructor(title, harga) {
		this.title = title;
		this.harga = harga;
	}

	// method untuk add to cart
	addToCart() {
		let row = document.createElement( 'div' );
		let items = document.querySelector( '.items' );
		let titleItem = document.querySelectorAll( '.title-user');
		titleItem.forEach( t => {
		  if ( t.textContent === this.title) {
			return alert( 'Item ini Sudah Ada' );
		  }
		} );

		let rowUser = `
		<div class="col-sm item-baris">
			<div class="card">
				<div class="card-body">
		  				<h5 class="card-title title-user">${this.title}</h5>
		  				<h6 class="card-subtitle harga-casing mb-2">${this.harga}</h6>
		  			<div class="kolom-quantiti">
						<input type="number" class="input quantiti" value="1">
						<button class="btn btn-danger hapus">Hapus</button>
		 		 	</div>
			</div>
	  </div>
		`;
		
		row.innerHTML = rowUser;
		items.appendChild(row);
		row.querySelector('.hapus').addEventListener('click', Shop.hapusBarang);
		row.querySelector('.quantiti').addEventListener('click', Shop.quantity);
	}

	static updateHarga() {
		let items = document.querySelector( '.items' );
		let itemBaris = document.querySelectorAll( '.item-baris' );
		let total = 0;
		for ( let i = 0; i < itemBaris.length; i++ ) {
		  let item = itemBaris[ i ];
		  let quantity = item.querySelectorAll( '.quantiti' )[ 0 ].value;
		  let harga = item.querySelectorAll( '.harga-casing' )[ 0 ];
		  let realHarga = parseFloat( harga.textContent.replace( 'Rp', '' ) );
		  total += realHarga * quantity;
		}
		total = Math.floor( total * 1000 ) / 1000;
		document.querySelector( '.total-harga' ).innerHTML = `Rp${total}`;
	  }

	static quantity(e) {
		const quantitiElement = e.target;
		if(quantitiElement.value === 0 || quantitiElement.value < 1) quantitiElement.value = 1;
		Shop.updateHarga();
	}

	static hapusBarang(e) {
		e.target.parentElement.parentElement.parentElement.parentElement.remove();
		Shop.updateHarga();
	}
}

( function shop() {
	const pesan = document.querySelectorAll( '.tombol-beli' );
	pesan.forEach( btnPesan => {
	  btnPesan.addEventListener( 'click', keranjang );
	} );

	const beliBarang = document.querySelector('.buy');
	beliBarang.addEventListener('click', BuyBarang);
	Shop.updateHarga();
  } )();

function keranjang(e) {
	let tombol = e.target;
	let casing = tombol.parentElement;
	let title = casing.querySelectorAll('.title-barang')[0].textContent;
	let harga = casing.querySelectorAll('.harga-barang')[0].textContent;
	let produk = new Shop(title, harga);
	produk.addToCart();
	Shop.updateHarga();
}

function BuyBarang() {
	alert("Terima kasih sudah berbelanja di HP Dewa");
	let items = document.querySelector('.items');
	while(items.hasChildNodes()) {
		items.removeChild(items.firstChild)
	}
	Shop.updateHarga()
}

(function ngetik(){

	if(count == txtElement.length){
		count = 0;
	}

	currentTxt = txtElement[count];

	words = currentTxt.slice(0, ++txtIndex);
	document.querySelector('.efek-ngetik').textContent = words;
	if(words.length == currentTxt.length){
		count++
		txtIndex = 0;
	}
	setTimeout(ngetik, 100);

}());