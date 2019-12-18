var $$ = Dom7;
var conn_database = "https://salon.skdevtechnology.com/api/";
var error_connection = "Jaringan tidak tersedia !!!";
var app = new Framework7({
root: '#app',
name: 'Salon Membership',
theme:'ios',
id: 'com.skdevtech.membership',
touch: { fastClicks: true,},
view: { iosDynamicNavbar: false, },
routes: [
	{
		path: '/index/',
		url: 'index.html',
		on:
		{
			pageInit:function(e,page)
			{
			},
		},
	},
	// home
	{
		path: '/home/',
		url: 'pages/home.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				
			},	
		},
	},
	// Salon
	{
		path: '/index_salon/',
		url: 'pages/salon/index_salon.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				
			},	
		},
	},
	// List Member Salon
	{
		path: '/list_member_salon/',
		url: 'pages/salon/list_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					// Emulate 2s loading
					setTimeout(function () {
						mainView.router.refreshPage();
						// When loading done, we need to reset it
						app.ptr.done(); // or e.detail();
					}, 2000);
				});
				$$('#list_member_salon').html('');
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"select_user.php",
					data:{category_user:'salon'},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#list_member_salon').html('');
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_member_salon').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="/lihat_member_salon/`+x[i]['iduser']+`" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+x[i]['name_user']+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+x[i]['phone_user']+`</div>
											</div>
										</a>
										</div>
										<div class="swipeout-actions-right">
											<a href="/ubah_member_salon/`+x[i]['iduser']+`" class="color-green edit-member">Ubah</a>
											<a href="#" data-id="` + x[i]['iduser'] + `" class="color-red show-member hapus-member-salon">Hapus</a>
										</div>
									</li>
								`);
							}
							$$('.hapus-member-salon').on('click', function () {
								var id = $$(this).data('id');
								app.dialog.confirm("Apakah Anda yakin untuk menghapus member ini?",function(){
									loadingdata();
									app.request({
										method:"POST",
										url:conn_database+"delete_user.php",
										data:{iduser:id},
										success:function(data){
											var obj = JSON.parse(data);
											if(obj['status'] == true) {
												var x = obj['data'];
												app.dialog.alert(x,'Notifikasi',function(){
													mainView.router.refreshPage();
												});
												determinateLoading = false;
												app.dialog.close();
											}
											else {
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(obj['message']);
											}
										},
										error:function(data){
											determinateLoading = false;
											app.dialog.close();
											app.dialog.alert(error_connection);
										}
								  	});
								});
							});
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#txtsearch_list_member_salon').on('keyup', function()
					{
						var cari = $$('#txtsearch_list_member_salon').val();
						app.request({
							method:"POST",
							url:conn_database+"select_user.php",
							data:{category_user:'salon', name_user:cari},
							success:function(data){
								var obj = JSON.parse(data);
								if(obj['status'] == true) {
									var x = obj['data'];
									$$('#list_member_salon').html('');
									for(var i = 0; i<x.length; i++)
									{
										$$('#list_member_salon').append(`
											<li class="swipeout">
												<div class="swipeout-content">
												<a href="/lihat_member_salon/`+x[i]['iduser']+`" class="item-link item-content">
													<div class="item-inner">
													<div class="item-title-row">
														<div class="item-title">`+x[i]['name_user']+`</div>
														<div class="item-after"></div>
													</div>
													<div class="item-subtitle">`+x[i]['phone_user']+`</div>
													</div>
												</a>
												</div>
												<div class="swipeout-actions-right">
													<a href="/ubah_member_salon/`+x[i]['iduser']+`" class="color-green edit-member">Ubah</a>
													<a href="#" data-id="` + x[i]['iduser'] + `" class="color-red show-member hapus-member-salon">Hapus</a>
												</div>
											</li>
										`);
									}
									$$('.hapus-member-salon').on('click', function () {
										var id = $$(this).data('id');
										app.dialog.confirm("Apakah Anda yakin untuk menghapus member ini?",function(){
											loadingdata();
											app.request({
												method:"POST",
												url:conn_database+"delete_user.php",
												data:{iduser:id},
												success:function(data){
													var obj = JSON.parse(data);
													if(obj['status'] == true) {
														var x = obj['data'];
														app.dialog.alert(x,'Notifikasi',function(){
															mainView.router.refreshPage();
														});
														determinateLoading = false;
														app.dialog.close();
													}
													else {
														determinateLoading = false;
														app.dialog.close();
														app.dialog.alert(obj['message']);
													}
												},
												error:function(data){
													determinateLoading = false;
													app.dialog.close();
													app.dialog.alert(error_connection);
												}
											  });
										});
									});
								}
								else 
								{
									app.dialog.alert(obj['message']);
									determinateLoading = false;
									app.dialog.close();
								}
							},
							error:function(data){
								determinateLoading = false;
								app.dialog.close();
								app.dialog.alert(error_connection);
							}
						});
				});
			},	
		},
	},
	// Tambah member Salon
	{
		path: '/tambah_member_salon/',
		url: 'pages/salon/tambah_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				$$('#btn-submit-register-member-salon').on('click', function(e) {
					var nama_tambah_member_salon = $$('#nama_tambah_member_salon').val();
					var nomer_tambah_member_salon = $$('#nomer_tambah_member_salon').val();
					var alamat_tambah_member_salon = $$('#alamat_tambah_member_salon').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"insert_user.php",
						data:{
							name_user:nama_tambah_member_salon,
							address_user:alamat_tambah_member_salon,
							phone_user:nomer_tambah_member_salon,
							category_user:'salon',
						},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Ubah member Salon
	{
		path: '/ubah_member_salon/:id',
		url: 'pages/salon/ubah_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var x = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/user_service/select_user_service.php",
					data:{iduser:x},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#nama_ubah_member_salon').val(x['user'][0]['name_user']);
							$$('#nomer_ubah_member_salon').val(x['user'][0]['phone_user']);
							$$('#alamat_ubah_member_salon').val(x['user'][0]['address_user']);
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#btn-submit-ubah-member-salon').on('click', function(e) {
					var nama_ubah_member_salon = $$('#nama_ubah_member_salon').val();
					var nomer_ubah_member_salon = $$('#nomer_ubah_member_salon').val();
					var alamat_ubah_member_salon = $$('#alamat_ubah_member_salon').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"update_user.php",
						data:{
							iduser:x,
							name_user:nama_ubah_member_salon,
							address_user:alamat_ubah_member_salon,
							phone_user:nomer_ubah_member_salon,
						},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Show member Salon
	{
		path: '/lihat_member_salon/:id',
		url: 'pages/salon/lihat_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var x = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/user_service/select_user_service.php",
					data:{iduser:x},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#name_user_member_salon').append(x['user'][0]['name_user']);
							$$('#phone_user_member_salon').append(x['user'][0]['phone_user']);
							$$('#alamat_user_member_salon').append(x['user'][0]['address_user']);
							$$('#riwayat_user').append(`<a href="/riwayat_member_salon/`+x+`" class="link">Riwayat</a>`);
							for(var i = 0; i<x['service'].length; i++)
							{
								$$('#service_user_member_salon').append(`
									<p>` +(i+1)+ `. `+ x['service'][i]['name_service'] +` -> `+ x['service'][i]['count_used_service'] +`/`+ x['service'][i]['count_total_service'] +`</p>
								`);
							}
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
			},	
		},
	},
	// List Paket Salon
	{
		path: '/list_paket_salon/',
		url: 'pages/salon/list_paket.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					// Emulate 2s loading
					setTimeout(function () {
						mainView.router.refreshPage();
						// When loading done, we need to reset it
						app.ptr.done(); // or e.detail();
					}, 2000);
				});
				$$('#list_paket_salon').html('');
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/service/select_service.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#list_paket_salon').html('');
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_paket_salon').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="#" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+x[i]['name_service']+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+x[i]['price_service']+`</div>
											</div>
										</a>
										</div>
										<div class="swipeout-actions-right">
											<a href="/ubah_paket_salon/`+x[i]['idservice']+`" class="color-green edit-member">Ubah</a>
											<a href="#" data-id=" `+x[i]['idservice']+` " class="color-red hapus-paket-salon">Hapus</a>
										</div>
									</li>
								`);
							}
							$$('.hapus-paket-salon').on('click', function () {
								var id = $$(this).data('id');
								app.dialog.confirm("Apakah Anda yakin untuk menghapus paket ini?",function(){
									loadingdata();
									app.request({
										method:"POST",
										url:conn_database+"salon/service/delete_service.php",
										data:{idservice:id},
										success:function(data){
											var obj = JSON.parse(data);
											if(obj['status'] == true) {
												var x = obj['data'];
												app.dialog.alert(x,'Notifikasi',function(){
													mainView.router.refreshPage();
												});
												determinateLoading = false;
												app.dialog.close();
											}
											else {
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(obj['message']);
											}
										},
										error:function(data){
											determinateLoading = false;
											app.dialog.close();
											app.dialog.alert(error_connection);
										}
									  });
								});
							});
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#txtsearch_list_paket_salon').on('keyup', function()
				{
					var cari = $$('#txtsearch_list_paket_salon').val();
					app.request({
						method:"POST",
						url:conn_database+"salon/service/select_service.php",
						data:{name_service:cari},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								$$('#list_paket_salon').html('');
								for(var i = 0; i<x.length; i++)
								{
									$$('#list_paket_salon').append(`
										<li class="swipeout">
											<div class="swipeout-content">
											<a href="#" class="item-link item-content">
												<div class="item-inner">
												<div class="item-title-row">
													<div class="item-title">`+x[i]['name_service']+`</div>
													<div class="item-after"></div>
												</div>
												<div class="item-subtitle">`+x[i]['price_service']+`</div>
												</div>
											</a>
											</div>
											<div class="swipeout-actions-right">
												<a href="/ubah_paket_salon/`+x[i]['idservice']+`" class="color-green edit-member">Ubah</a>
												<a href="#" data-id=" `+x[i]['idservice']+` " class="color-red hapus-paket-salon">Hapus</a>
											</div>
										</li>
									`);
								}
								$$('.hapus-paket-salon').on('click', function () {
									var id = $$(this).data('id');
									app.dialog.confirm("Apakah Anda yakin untuk menghapus paket ini?",function(){
										loadingdata();
										app.request({
											method:"POST",
											url:conn_database+"salon/service/delete_service.php",
											data:{idservice:id},
											success:function(data){
												var obj = JSON.parse(data);
												if(obj['status'] == true) {
													var x = obj['data'];
													app.dialog.alert(x,'Notifikasi',function(){
														mainView.router.refreshPage();
													});
													determinateLoading = false;
													app.dialog.close();
												}
												else {
													determinateLoading = false;
													app.dialog.close();
													app.dialog.alert(obj['message']);
												}
											},
											error:function(data){
												determinateLoading = false;
												app.dialog.close();
												app.dialog.alert(error_connection);
											}
										  });
									});
								});

							}
							else 
							{
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Tambah Paket Salon
	{
		path: '/tambah_paket_salon/',
		url: 'pages/salon/tambah_paket.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				$$('#btn-submit-tambah-paket-salon').on('click', function(e) {
					var nama_tambah_paket_salon = $$('#nama_tambah_paket_salon').val();
					var harga_tambah_paket_salon = $$('#harga_tambah_paket_salon').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"salon/service/insert_service.php",
						data:{
							name_service:nama_tambah_paket_salon,
							price_service:harga_tambah_paket_salon,
						},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Ubah Paket Salon
	{
		path: '/ubah_paket_salon/:id',
		url: 'pages/salon/ubah_paket.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var x = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/service/show_service.php",
					data:{idservice:x},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#nama_ubah_paket_salon').val(x[0]['name_service']);
							$$('#harga_ubah_paket_salon').val(x[0]['price_service']);
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#btn-submit-ubah-paket-salon').on('click', function(e) {
					var nama_ubah_paket_salon = $$('#nama_ubah_paket_salon').val();
					var harga_ubah_paket_salon = $$('#harga_ubah_paket_salon').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"/salon/service/update_service.php",
						data:{
							idservice:x,
							name_service:nama_ubah_paket_salon,
							price_service:harga_ubah_paket_salon,
						},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Tambah Paket Member Salon
	{
		path: '/tambah_paket_member_salon/',
		url: 'pages/salon/tambah_paket_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/select_user_and_service.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x['service'].length; i++)
							{
								$$('#paket_tambah_paket_member_salon').append(`
									<option value="`+x['service'][i]['idservice']+`">`+x['service'][i]['name_service']+`</option>
								`);
							}
							for(var i = 0; i<x['user'].length; i++)
							{
								$$('#member_tambah_paket_member_salon').append(`
									<option value="`+x['user'][i]['iduser']+`">`+x['user'][i]['phone_user']+` - `+x['user'][i]['name_user']+`</option>
								`);
							}
							determinateLoading = false;
							app.dialog.close();
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#btn-submit-tambah-paket-member-salon').on('click', function(e) {
					var paket_tambah_paket_member_salon = $$('#paket_tambah_paket_member_salon').val();
					var member_tambah_paket_member_salon = $$('#member_tambah_paket_member_salon').val();
					var jumlah_tambah_paket_member_salon = $$('#jumlah_tambah_paket_member_salon').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"salon/user_service/insert_user_service.php",
						data:{
							iduser:member_tambah_paket_member_salon,
							idservice:paket_tambah_paket_member_salon,
							count_total_service:jumlah_tambah_paket_member_salon,
						},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// List Pemakaian Member Salon
	{
		path: '/list_pemakaian_member_salon/',
		url: 'pages/salon/list_pemakaian.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					// Emulate 2s loading
					setTimeout(function () {
						mainView.router.refreshPage();
						// When loading done, we need to reset it
						app.ptr.done(); // or e.detail();
					}, 2000);
				});
				$$('#list_pemakaian_member_salon').html('');
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"select_user.php",
					data:{category_user:'salon'},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#list_pemakaian_member_salon').html('');
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_pemakaian_member_salon').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="/transaksi_paket_member_salon/`+x[i]['iduser']+`" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+x[i]['name_user']+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+x[i]['phone_user']+`</div>
											</div>
										</a>
										</div>
									</li>
								`);
							}
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#txtsearch_list_pemakaian_member_salon').on('keyup', function()
				{
					var cari = $$('#txtsearch_list_pemakaian_member_salon').val();
					app.request({
						method:"POST",
						url:conn_database+"select_user.php",
						data:{category_user:'salon', name_user:cari},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								$$('#list_pemakaian_member_salon').html('');
								for(var i = 0; i<x.length; i++)
								{
									$$('#list_pemakaian_member_salon').append(`
										<li class="swipeout">
											<div class="swipeout-content">
											<a href="/transaksi_paket_member_salon/`+x[i]['iduser']+`" class="item-link item-content">
												<div class="item-inner">
												<div class="item-title-row">
													<div class="item-title">`+x[i]['name_user']+`</div>
													<div class="item-after"></div>
												</div>
												<div class="item-subtitle">`+x[i]['phone_user']+`</div>
												</div>
											</a>
											</div>
										</li>
									`);
								}

							}
							else 
							{
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Transaksi Paket Member Salon
	{
		path: '/transaksi_paket_member_salon/:id',
		url: 'pages/salon/transaksi_paket_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var x = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"salon/user_service/select_user_service.php",
					data:{iduser:x},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x['service'].length; i++)
							{
								$$('#paket_transaksi_paket_member_salon').append(`
									<option value="`+x['service'][i]['idservice']+`">`+x['service'][i]['name_service']+`</option>
								`);
							}
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#btn-submit-transaksi-paket-member-salon').on('click', function(e) {
					app.dialog.confirm("Apakah Anda yakin untuk menggunakan paket ini?",function(){
						var paket_transaksi_paket_member_salon = $$('#paket_transaksi_paket_member_salon').val();
						loadingdata();
						app.request({
							method:"POST",
							url:conn_database+"salon/user_service/insert_user_service.php",
							data:{
								iduser:member_transaksi_paket_member_salon,
								idservice:paket_transaksi_paket_member_salon,
								count_total_service:jumlah_transaksi_paket_member_salon,
							},
							success:function(data){
								var obj = JSON.parse(data);
								if(obj['status'] == true) {
									var x = obj['data'];
									app.dialog.alert(x,'Notifikasi',function(){
										app.views.main.router.back({
											url: /home/,
											force: true,
											ignoreCache: true
										});
									});
									determinateLoading = false;
									app.dialog.close();
								}
								else {
									app.dialog.alert(obj['message']);
									determinateLoading = false;
									app.dialog.close();
								}
							},
							error:function(data){
								determinateLoading = false;
								app.dialog.close();
								app.dialog.alert(error_connection);
							}
						});
					});
				});
			},	
		},
	},
	// Sothys
	{
		path: '/index_sothys/',
		url: 'pages/sothys/index_sothys.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				
			},	
		},
	},
	// List Member Sothys
	{
		path: '/list_member/',
		url: 'pages/sothys/list_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					// Emulate 2s loading
					setTimeout(function () {
						mainView.router.refreshPage();
						// When loading done, we need to reset it
						app.ptr.done(); // or e.detail();
					}, 2000);
				});
				loadingdata();
				app.request({
					method:"GET",
					url:conn_database+"member/index_member.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_member').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="#" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+x[i]['username']+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+x[i]['name']+`</div>
											</div>
										</a>
										</div>
										<div class="swipeout-actions-right">
										<a href="/edit_member/`+x[i]['username']+`" class="color-green edit-member">Edit</a>
										<a href="/show_member/`+x[i]['username']+`" class="color-blue show-member">Show</a>
										</div>
									</li>
								`);
							}
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
			},	
		},
	},
	// Edit member
	{
		path: '/edit_member/:username',
		url: 'pages/member/edit_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var username = page.router.currentRoute.params.username;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"member/show_member.php",
					data:{username:username},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#username_edit_member').append(x[0]['username']);
							$$('#name_edit_member').val(x[0]['name']);
							determinateLoading = false;
							app.dialog.close();
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#btn-submit-edit-member').on('click', function(e) {
					var name = $$('#name_edit_member').val();
					var password = $$('#password_edit_member').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"member/edit_member.php",
						data:{username:username, name:name, password:password},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Show member
	{
		path: '/show_member/:id',
		url: 'pages/member/show_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				
			},	
		},
	},
	// Index Service
	{
		path: '/index_service/',
		url: 'pages/service/index_service.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					// Emulate 2s loading
					setTimeout(function () {
						mainView.router.refreshPage();
						// When loading done, we need to reset it
						app.ptr.done(); // or e.detail();
					}, 2000);
				});
				loadingdata();
				app.request({
					method:"GET",
					url:conn_database+"service/index_service.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x.length; i++)
							{
								$$('#list_service').append(`
									<li class="swipeout">
										<div class="swipeout-content">
										<a href="#" class="item-link item-content">
											<div class="item-inner">
											<div class="item-title-row">
												<div class="item-title">`+(i+1)+`</div>
												<div class="item-after"></div>
											</div>
											<div class="item-subtitle">`+x[i]['name_service']+`</div>
											</div>
										</a>
										</div>
										<div class="swipeout-actions-right">
										<a href="/edit_service/`+x[i]['id_service']+`" class="color-green">Edit</a>
										<a href="/show_service/`+x[i]['id_service']+`" class="color-blue">Show</a>
										</div>
									</li>
								`);
							}
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
			},	
		},
	},
	// Index Service Member
	{
		path: '/index_service_member/',
		url: 'pages/service/index_service_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var $ptrContent = $$('.ptr-content');
				$ptrContent.on('ptr:refresh', function (e) {
					// Emulate 2s loading
					setTimeout(function () {
						mainView.router.refreshPage();
						// When loading done, we need to reset it
						app.ptr.done(); // or e.detail();
					}, 2000);
				});
				loadingdata();
				app.request({
					method:"GET",
					url:conn_database+"service/select_service_member.php",
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							var temp = "";
							for(var i = 0; i<x.length; i++)
							{
								temp += `
									<tr>
										<td class="label-cell">`+x[i]['username']+`</td>
										<td class="numeric-cell">`+x[i]['name']+`</td>
										<td class="numeric-cell">`+x[i]['name_service']+`</td>
										<td class="numeric-cell">`+x[i]['count_service']+`</td>
									</tr>
								`;
							}
							$$('#list_member_service').html(temp);
							determinateLoading = false;
							app.dialog.close();
						}
						else 
						{
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
			},	
		},
	},
	// Create Service
	{
		path: '/create_service/',
		url: 'pages/service/create_service.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				$$('#btn-submit-create-service').on('click', function(e) {
					var name = $$('#name_create_service').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"service/create_service.php",
						data:{name:name},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Edit Service
	{
		path: '/edit_service/:id',
		url: 'pages/service/edit_service.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				var id = page.router.currentRoute.params.id;
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"service/show_service.php",
					data:{id:id},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							$$('#name_edit_service').val(x[0]['name_service']);
							determinateLoading = false;
							app.dialog.close();
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#btn-submit-edit-service').on('click', function(e) {
					var name = $$('#name_edit_service').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"service/edit_service.php",
						data:{id:id, name:name},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Create Service Member
	{
		path: '/create_service_member/',
		url: 'pages/service/create_service_member.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"service/index_service.php",
					data:{name:name},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x.length; i++)
							{
								$$('#create_service_member').append(`
									<option value="`+x[i]['id_service']+`">`+x[i]['name_service']+`</option>
								`);
							}
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				app.request({
					method:"POST",
					url:conn_database+"member/index_member.php",
					data:{name:name},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x.length; i++)
							{
								$$('#create_member_service').append(`
									<option value="`+x[i]['username']+`">`+x[i]['username']+`-`+x[i]['name']+`</option>
								`);
							}
							determinateLoading = false;
							app.dialog.close();
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#btn-submit-create-service_member').on('click', function(e) {
					var id_service = $$('#create_service_member').val();
					var username = $$('#create_member_service').val();
					var count_service = $$('#create_count_service_membe').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"service/create_service_member.php",
						data:{id_service:id_service, username:username, count_service:count_service},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
			},	
		},
	},
	// Transaction
	{
		path: '/transaction_service/',
		url: 'pages/transaction/transaction_service.html',
		on: 
		{
			pageInit: function (e, page) 
			{
				loadingdata();
				app.request({
					method:"POST",
					url:conn_database+"member/index_member.php",
					data:{name:name},
					success:function(data){
						var obj = JSON.parse(data);
						if(obj['status'] == true) {
							var x = obj['data'];
							for(var i = 0; i<x.length; i++)
							{
								$$('#transaction_service_member').append(`
									<option value="`+x[i]['username']+`">`+x[i]['username']+`-`+x[i]['name']+`</option>
								`);
							}
							app.request({
								method:"POST",
								url:conn_database+"service/show_user_service.php",
								data:{username:x[0]['username']},
								success:function(data){
									var obj = JSON.parse(data);
									if(obj['status'] == true) {
										var x = obj['data'];
										for(var i = 0; i<x.length; i++)
										{
											$$('#transaction_service_service').append(`
												<option value="`+x[i]['id_service']+`">`+x[i]['name_service']+`</option>
											`);
										}
										$$('#transaction_service_count').val(x[0]['count_service']);
										determinateLoading = false;
										app.dialog.close();
									}
									else {
										app.dialog.alert(obj['message']);
										determinateLoading = false;
										app.dialog.close();
									}
								},
								error:function(data){
									determinateLoading = false;
									app.dialog.close();
									app.dialog.alert(error_connection);
								}
							});
						}
						else {
							app.dialog.alert(obj['message']);
							determinateLoading = false;
							app.dialog.close();
						}
					},
					error:function(data){
						determinateLoading = false;
						app.dialog.close();
						app.dialog.alert(error_connection);
					}
				});
				$$('#transaction_service_member').on('change', function(e) {
					var username = $$('#transaction_service_member').val();
					$$('#transaction_service_service').html("");
					$$('#transaction_service_count').val("");
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"service/show_user_service.php",
						data:{username:username},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								for(var i = 0; i<x.length; i++)
								{
									$$('#transaction_service_service').append(`
										<option value="`+x[i]['id_service']+`">`+x[i]['name_service']+`</option>
									`);
								}
								$$('#transaction_service_count').val(x[0]['count_service']);
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert("Service = "+obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
				$$('#transaction_service_service').on('change', function(e) {
					var id_service = $$('#transaction_service_service').val();
					var username = $$('#transaction_service_member').val();
					$$('#transaction_service_count').val("");
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"service/show_user_service_count.php",
						data:{username:username, id_service:id_service},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								$$('#transaction_service_count').val(x[0]['count_service']);
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert("Count = "+obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection);
						}
					});
				});
				$$('#btn-submit-create-transaction_service').on('click', function(e) {
					var username = $$('#transaction_service_member').val();
					var id_service = $$('#transaction_service_service').val();
					var password = $$('#transaction_service_password').val();
					loadingdata();
					app.request({
						method:"POST",
						url:conn_database+"transaction/transaction_coba.php",
						data:{id_service:id_service, username:username, password:password},
						success:function(data){
							var obj = JSON.parse(data);
							if(obj['status'] == true) {
								var x = obj['data'];
								app.dialog.alert(x,'Notifikasi',function(){
									app.views.main.router.back({
										url: /home/,
										force: true,
										ignoreCache: true
									});
								});
								determinateLoading = false;
								app.dialog.close();
							}
							else {
								app.dialog.alert(obj['message']);
								determinateLoading = false;
								app.dialog.close();
							}
						},
						error:function(data){
							determinateLoading = false;
							app.dialog.close();
							app.dialog.alert(error_connection,'Notifikasi',function(){
								// app.views.main.router.back({
								// 	url: /home/,
								// 	force: true,
								// 	ignoreCache: true
								// });
							});
						}
					});
				});
			},	
		},
	},
]});
var mainView = app.views.create('.view-main',{ url: '/home/'});

function onBackKeyDown() {
	if(app.views.main.history.length == 1 || app.views.main.router.url == '/home/')
	{
		navigator.app.exitApp();
	} 
	else 
	{
		if(app.views.main.router.url == '/login/') {  
			navigator.app.exitApp();
		}
		else
		{
			app.dialog.close();
			// app.views.main.router.back();
			app.views.main.router.back({
				url: /home/,
				force: true,
				ignoreCache: true
			  });
			return false;
		}
	}
}
document.addEventListener("backbutton", onBackKeyDown, false);
function loadingdata() {
	showDeterminate(true);
	determinateLoading = false;
	function showDeterminate(inline) 
	{
		determinateLoading = true;
		var progressBarEl;
		if (inline) {
			progressBarEl = app.dialog.progress();
		} else {
			progressBarEl = app.progressbar.show(0, app.theme === 'md' ? 'yellow' : 'blue');
		}
		function simulateLoading() {
			setTimeout(function () {
				simulateLoading();
			}, Math.random() * 300 + 300);
		}
		simulateLoading();
	}
}