require 'spec_helper'

describe Planta do
  let(:planta) { Planta.new }

  describe "location" do
    subject { planta.location }

    context "when no location is set" do
      before do
        planta[:location] = nil
      end
      it { should be_nil }
    end

    context "when a bogus location was set" do
      before do
        planta[:location] = ""
      end
      it { should be_nil }
    end

    context "when WKT location is set" do
      before do
        planta[:location] = "POINT(1.0 1.0)"
      end
      it { should == {"type"=>"Point", "coordinates"=>[1.0, 1.0]}}
    end
  end

  describe "location=" do
    before do
      planta.location= value
    end
    subject { planta.location }

    context "when setting a valid value" do
      let(:value) { {"type"=>"Point", "coordinates"=>[1.0, 1.0]}}
      it { should == value }
    end

    context "when setting an invalid value" do
      let(:value) { "bogus value" }
      it { should == nil }
    end

    context "when setting to nil" do
      let(:value) { nil }
      it { should == nil }
    end
  end
end
