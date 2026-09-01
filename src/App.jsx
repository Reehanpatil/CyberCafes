import { Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import CategoryList from "./pages/CategoryList";
import JobDetail from "./pages/JobDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import ManageCategories from "./pages/Admin/ManageCategories";
import ManageJobs from "./pages/Admin/ManageJobs";
import ManageServices from "./pages/Admin/ManageServices";

export default function App() {
  return (
    <DataProvider>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path='/about'
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path='/contact'
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path='/services'
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />
        <Route
          path='/services/:serviceId'
          element={
            <Layout>
              <ServiceDetail />
            </Layout>
          }
        />
        <Route
          path='/:categoryId'
          element={
            <Layout>
              <CategoryList />
            </Layout>
          }
        />
        <Route
          path='/:categoryId/:jobId'
          element={
            <Layout>
              <JobDetail />
            </Layout>
          }
        />

        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='categories' element={<ManageCategories />} />
          <Route path='jobs' element={<ManageJobs />} />
          <Route path='services' element={<ManageServices />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}
