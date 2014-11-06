Rails.application.routes.draw do
  get '/', to: 'home_controller#home'

  mount OpenWorldServer::Engine, at: "/ows" 

end
