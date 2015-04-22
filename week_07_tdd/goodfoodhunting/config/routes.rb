Rails.application.routes.draw do


          # controller#action (method)
  get '/' => 'pages#index'
  get '/about' => 'pages#about'

  # get show form
  get '/dishes/new' => 'dishes#new'
  # post form - create
  post '/dishes' => 'dishes#create'


  # delete destroy
  delete '/dishes/:id/delete' => 'dishes#destroy'


  # get show edit form
  get '/dishes/:id/edit/' => 'dishes#edit'
  #put form - update
  put '/dishes/:id' => 'dishes#update'


  # get show single dish
  get '/dishes' => 'dishes#index'

  # get list all dish


end