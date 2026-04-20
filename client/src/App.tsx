import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { I18nProvider } from "./contexts/I18nContext";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import SpeciesIndex from "./pages/SpeciesIndex";
import SpeciesDetail from "./pages/SpeciesDetail";
import BlogIndex from "./pages/BlogIndex";
import BlogPost from "./pages/BlogPost";
import CollectionPage from "./pages/CollectionPage";
import BuddyProfilePage from "./pages/BuddyProfilePage";
import ComparePage from "./pages/ComparePage";
import PowerupTrackerPage from "./pages/PowerupTrackerPage";
import RevivePage from "./pages/RevivePage";
import HiddenFeaturesPage from "./pages/HiddenFeaturesPage";

function Router() {
  return (
    <PageTransition>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/species"} component={SpeciesIndex} />
        <Route path={"/species/:slug"} component={SpeciesDetail} />
        <Route path={"/blog"} component={BlogIndex} />
        <Route path={"/blog/:slug"} component={BlogPost} />
        <Route path={"/collection"} component={CollectionPage} />
        <Route path={"/buddy/:uuid"} component={BuddyProfilePage} />
        <Route path={"/compare"} component={ComparePage} />
        <Route path={"/powerup-tracker"} component={PowerupTrackerPage} />
        <Route path={"/revive"} component={RevivePage} />
        <Route path={"/hidden-features"} component={HiddenFeaturesPage} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </PageTransition>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" switchable={true}>
        <I18nProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </I18nProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
