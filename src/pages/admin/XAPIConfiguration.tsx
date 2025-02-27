
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Database, 
  Server, 
  Shield, 
  Settings, 
  Share2, 
  ArrowLeft,
  Save,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AdminSidebar from '@/components/admin/AdminSidebar';

const XAPIConfiguration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Configuration state
  const [lrsEndpoint, setLrsEndpoint] = useState('https://lrs.example.com/xapi/');
  const [lrsUsername, setLrsUsername] = useState('');
  const [lrsPassword, setLrsPassword] = useState('');
  const [lrsAuthenticated, setLrsAuthenticated] = useState(false);
  const [isLrsTesting, setIsLrsTesting] = useState(false);
  
  const [enableXAPI, setEnableXAPI] = useState(true);
  const [enableSCORM12, setEnableSCORM12] = useState(true);
  const [enableSCORM2004, setEnableSCORM2004] = useState(true);
  
  const [dataRetentionPolicy, setDataRetentionPolicy] = useState('1-year');
  const [autoArchive, setAutoArchive] = useState(true);
  
  // Test LRS connection
  const testLRSConnection = async () => {
    setIsLrsTesting(true);
    
    // Simulate testing LRS connection
    setTimeout(() => {
      if (lrsEndpoint && lrsUsername && lrsPassword) {
        setLrsAuthenticated(true);
        toast({
          title: "LRS Connection Successful",
          description: "Successfully connected to the Learning Record Store",
        });
      } else {
        setLrsAuthenticated(false);
        toast({
          title: "LRS Connection Failed",
          description: "Please check your LRS credentials and try again",
          variant: "destructive",
        });
      }
      setIsLrsTesting(false);
    }, 1500);
  };
  
  // Save configuration
  const saveConfiguration = () => {
    toast({
      title: "Configuration Saved",
      description: "xAPI/SCORM configuration has been updated successfully",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white"
        >
          {isSidebarOpen ? <Settings className="h-5 w-5" /> : <Settings className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
        <main className="p-6">
          <div className="flex items-center mb-8">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/admin')}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">xAPI/SCORM Configuration</h1>
              <p className="text-slate-500">Configure settings for game data tracking</p>
            </div>
          </div>
          
          <Tabs defaultValue="lrs" className="w-full">
            <TabsList className="mb-6 bg-slate-100">
              <TabsTrigger value="lrs" className="data-[state=active]:bg-white">
                <Server className="h-4 w-4 mr-2" />
                LRS Configuration
              </TabsTrigger>
              <TabsTrigger value="protocols" className="data-[state=active]:bg-white">
                <Share2 className="h-4 w-4 mr-2" />
                Protocols
              </TabsTrigger>
              <TabsTrigger value="data" className="data-[state=active]:bg-white">
                <Database className="h-4 w-4 mr-2" />
                Data Management
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-white">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
            </TabsList>
            
            {/* LRS Configuration Tab */}
            <TabsContent value="lrs">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Record Store (LRS) Settings</CardTitle>
                  <CardDescription>
                    Configure your connection to an xAPI Learning Record Store
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center">
                      LRS Endpoint URL
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-4 w-4 text-slate-400 ml-2" />
                          </TooltipTrigger>
                          <TooltipContent className="w-80">
                            <p>The base URL of your Learning Record Store (LRS). This should end with /xapi/ or similar.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                    <Input 
                      value={lrsEndpoint}
                      onChange={(e) => setLrsEndpoint(e.target.value)}
                      placeholder="https://lrs.example.com/xapi/"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">LRS Username (Client ID)</label>
                      <Input 
                        value={lrsUsername}
                        onChange={(e) => setLrsUsername(e.target.value)}
                        placeholder="Enter LRS username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">LRS Password (Client Secret)</label>
                      <Input 
                        type="password"
                        value={lrsPassword}
                        onChange={(e) => setLrsPassword(e.target.value)}
                        placeholder="Enter LRS password"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className={`p-4 rounded-md ${lrsAuthenticated ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                      <div className="flex items-center">
                        {lrsAuthenticated ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                        )}
                        <div>
                          <p className={`font-medium ${lrsAuthenticated ? 'text-green-700' : 'text-amber-700'}`}>
                            {lrsAuthenticated ? 'LRS Connected' : 'LRS Not Connected'}
                          </p>
                          <p className="text-sm text-slate-600">
                            {lrsAuthenticated 
                              ? 'Your application is successfully connected to the LRS' 
                              : 'Please configure your LRS connection and test it'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={testLRSConnection}
                    disabled={isLrsTesting}
                  >
                    {isLrsTesting ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Testing Connection...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Test Connection
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    onClick={saveConfiguration}
                    className="bg-brand-purple hover:bg-brand-purple-dark"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Protocols Tab */}
            <TabsContent value="protocols">
              <Card>
                <CardHeader>
                  <CardTitle>Protocol Settings</CardTitle>
                  <CardDescription>
                    Configure which learning data standards to support
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-base font-medium">Enable xAPI (Tin Can)</label>
                        <p className="text-sm text-slate-500">
                          Support tracking with the Experience API (xAPI) standard
                        </p>
                      </div>
                      <Switch 
                        checked={enableXAPI} 
                        onCheckedChange={setEnableXAPI} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-base font-medium">Enable SCORM 1.2</label>
                        <p className="text-sm text-slate-500">
                          Support tracking with the SCORM 1.2 standard
                        </p>
                      </div>
                      <Switch 
                        checked={enableSCORM12} 
                        onCheckedChange={setEnableSCORM12} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-base font-medium">Enable SCORM 2004</label>
                        <p className="text-sm text-slate-500">
                          Support tracking with the SCORM 2004 standard
                        </p>
                      </div>
                      <Switch 
                        checked={enableSCORM2004} 
                        onCheckedChange={setEnableSCORM2004} 
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="p-4 rounded-md bg-slate-50 border border-slate-200">
                      <h4 className="font-medium mb-2">Compatibility Information</h4>
                      <p className="text-sm text-slate-600 mb-4">
                        Below is a compatibility matrix of which game authoring tools support which standards:
                      </p>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 px-3">Authoring Tool</th>
                              <th className="text-center py-2 px-3">xAPI</th>
                              <th className="text-center py-2 px-3">SCORM 1.2</th>
                              <th className="text-center py-2 px-3">SCORM 2004</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2 px-3">Articulate Storyline</td>
                              <td className="text-center py-2 px-3">✅</td>
                              <td className="text-center py-2 px-3">✅</td>
                              <td className="text-center py-2 px-3">✅</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 px-3">Adobe Captivate</td>
                              <td className="text-center py-2 px-3">✅</td>
                              <td className="text-center py-2 px-3">✅</td>
                              <td className="text-center py-2 px-3">✅</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2 px-3">Lectora</td>
                              <td className="text-center py-2 px-3">✅</td>
                              <td className="text-center py-2 px-3">✅</td>
                              <td className="text-center py-2 px-3">✅</td>
                            </tr>
                            <tr>
                              <td className="py-2 px-3">iSpring</td>
                              <td className="text-center py-2 px-3">⚠️</td>
                              <td className="text-center py-2 px-3">✅</td>
                              <td className="text-center py-2 px-3">✅</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={saveConfiguration}
                    className="bg-brand-purple hover:bg-brand-purple-dark ml-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Data Management Tab */}
            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>Data Management Settings</CardTitle>
                  <CardDescription>
                    Configure how learning records are stored and managed
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-base font-medium">Data Retention Policy</label>
                      <p className="text-sm text-slate-500 mb-2">
                        Specify how long learning records should be kept before archiving
                      </p>
                      
                      <Select
                        value={dataRetentionPolicy}
                        onValueChange={setDataRetentionPolicy}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3-months">3 Months</SelectItem>
                          <SelectItem value="6-months">6 Months</SelectItem>
                          <SelectItem value="1-year">1 Year</SelectItem>
                          <SelectItem value="2-years">2 Years</SelectItem>
                          <SelectItem value="5-years">5 Years</SelectItem>
                          <SelectItem value="forever">Keep Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="space-y-0.5">
                        <label className="text-base font-medium">Automatic Archiving</label>
                        <p className="text-sm text-slate-500">
                          Automatically archive old data based on retention policy
                        </p>
                      </div>
                      <Switch 
                        checked={autoArchive} 
                        onCheckedChange={setAutoArchive} 
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button variant="outline">Export Data Schema</Button>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
                      <h4 className="font-medium flex items-center text-blue-700 mb-2">
                        <Info className="h-5 w-5 mr-2" />
                        About xAPI Data Storage
                      </h4>
                      <p className="text-sm text-slate-600">
                        xAPI data is stored as "statements" with three primary components:
                      </p>
                      <ul className="list-disc pl-5 mt-2 text-sm text-slate-600 space-y-1">
                        <li><strong>Actor</strong>: Who performed the action (usually a student)</li>
                        <li><strong>Verb</strong>: What action was taken (completed, attempted, answered, etc.)</li>
                        <li><strong>Object</strong>: What the action was performed on (a quiz, a game, a question)</li>
                      </ul>
                      <p className="text-sm text-slate-600 mt-2">
                        Additional data can include context, result, and timestamp information.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={saveConfiguration}
                    className="bg-brand-purple hover:bg-brand-purple-dark ml-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Configure security settings for learning data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-base font-medium">Encrypt Stored Data</label>
                        <p className="text-sm text-slate-500">
                          Apply encryption to learning records stored in the database
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-base font-medium">Require Secure Connections</label>
                        <p className="text-sm text-slate-500">
                          Only accept data over HTTPS connections
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <label className="text-base font-medium">API Access Log</label>
                        <p className="text-sm text-slate-500">
                          Maintain detailed logs of all API access to learning data
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <label className="text-base font-medium">Access Control</label>
                    <p className="text-sm text-slate-500 mb-2">
                      Who should have access to learning record data
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="admins" className="rounded" defaultChecked />
                        <label htmlFor="admins">Administrators</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="teachers" className="rounded" defaultChecked />
                        <label htmlFor="teachers">Teachers (only for their students)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="students" className="rounded" defaultChecked />
                        <label htmlFor="students">Students (only their own data)</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="parents" className="rounded" />
                        <label htmlFor="parents">Parents (only their children's data)</label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={saveConfiguration}
                    className="bg-brand-purple hover:bg-brand-purple-dark ml-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default XAPIConfiguration;
